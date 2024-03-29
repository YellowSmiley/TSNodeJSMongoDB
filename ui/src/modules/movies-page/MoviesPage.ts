import { TMovie } from "../../../../shared/types";
import MovieRow from "./MovieRow";

const template = document.createElement("template");
template.innerHTML = `
  <style>
    h1 {
      margin-top: 0
    }
    table {
      border-collapse: collapse;
      width: 100%;
    }
    tbody {
      max-height: 400px;
      overflow-y: scroll;
    }
    th, td {
      text-align: left;
      padding: 8px;
    }
    tr:nth-child(even) {
      background-color: #f2f2f2;
    }
    .pagination {
      display: flex;
      justify-content: space-between;
      margin-top: 1rem;
    }
    .pagination button {
      padding: 0.5rem 1rem;
      border: 1px solid #ccc;
      border-radius: 5px;
      background-color: #fff;
      cursor: pointer;
    }
  </style>

  <div>
    <h1>Movies</h1>
    <p>A list of movies which have create, read, update and delete actions on.</p>
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Release Year</th>
          <th>Rating (IMDB)</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>
    <div class="pagination">
      <button id="prevPageBtn">Previous</button>
      <span>Page: <span id="page">1</span></span>
      <button id="nextPageBtn">Next</button>
    </div>
  </div>
`;

class MoviesPage extends HTMLElement {
  private movies: TMovie[] = [];
  private page = 1;
  private limit = 20;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.fetchData();
    this.setupPagination();
  }

  async fetchData() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_SERVICES_URL}/movies?page=${
          this.page
        }&limit=${this.limit}`
      );
      this.movies = await response.json();
    } catch (error) {
      console.error(error);
    } finally {
      this.renderMovies();
    }
  }

  renderMovies() {
    const tbody = this.shadowRoot?.querySelector("tbody");
    if (!tbody) return;
    tbody.innerHTML = "";
    if (this.movies.length === 0) {
      tbody.innerHTML = "<tr><td>No movies found</td></tr>";
      return;
    }

    this.movies.forEach((movie) => {
      const row = document.createElement("tr", { is: "movie-row" }) as MovieRow;
      row.movie = movie;
      tbody.appendChild(row);
    });
  }

  setupPagination() {
    const prevPageBtn = this.shadowRoot?.getElementById("prevPageBtn");
    const nextPageBtn = this.shadowRoot?.getElementById("nextPageBtn");
    const page = this.shadowRoot?.getElementById("page");

    if (prevPageBtn && nextPageBtn && page) {
      prevPageBtn.addEventListener("click", () => {
        if (this.page > 1) {
          this.page--;
          page.textContent = this.page.toString();
          this.fetchData();
        }
      });

      nextPageBtn.addEventListener("click", () => {
        this.page++;
        page.textContent = this.page.toString();
        this.fetchData();
      });
    }
  }
}

export default MoviesPage;
