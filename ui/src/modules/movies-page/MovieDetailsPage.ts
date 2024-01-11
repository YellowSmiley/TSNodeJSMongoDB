import { TMovie } from "../../../../shared/types";

const template = document.createElement("template");
template.innerHTML = `
  <style>
    h1 {
      margin-top: 0
    }
    input {
      display: block;
      margin-bottom: 1rem;
    }
    label {
      font-weight: bold;
    }
    button {
      padding: 0.5rem 1rem;
      border: 1px solid #ccc;
      border-radius: 5px;
      background-color: #fff;
      cursor: pointer;
    }
  </style>

  <div>
    <h1>Movie Form</h1>
    <form>
    </form>
  </div>
`;

class MovieDetailsPage extends HTMLElement {
  private _movieId: string | undefined = undefined;
  private movie: TMovie | undefined;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));
  }

  set pageId(value: string | undefined) {
    this._movieId = value;
    this.fetchData();
  }

  connectedCallback() {
    this.fetchData();
  }

  renderForm() {
    const form = this.shadowRoot?.querySelector("form");
    if (!form) return;

    form.innerHTML = `
      <label for="title">Title</label>
      <input type="text" name="title" id="title" value="${
        this.movie?.title || ""
      }" />

      <label for="released">Released</label>
      <input type="date" name="released" id="released" value="${
        this.movie?.released || ""
      }" />

      <label for="rating">Rating</label>
      <input type="number" name="rating" id="rating" value="${
        this.movie?.imdb.rating || ""
      }" />

      <button type="submit">Save</button>
    `;
  }

  async fetchData() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_SERVICES_URL}/movies/${this._movieId}`
      );
      this.movie = await response.json();
    } catch (error) {
      console.error(error);
    } finally {
      this.renderForm();
    }
  }
}

export default MovieDetailsPage;
