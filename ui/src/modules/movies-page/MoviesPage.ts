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
    th, td {
      text-align: left;
      padding: 8px;
    }
    tr:nth-child(even) {
      background-color: #f2f2f2;
    }
  </style>

  <div>
    <h1>Movies</h1>
    <p>A list of movies.</p>
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
  </div>
`;

class MoviesPage extends HTMLElement {
  private movies: TMovie[] = [];
  private page = 1;
  private limit = 10;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.fetchData();
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
}

export default MoviesPage;
