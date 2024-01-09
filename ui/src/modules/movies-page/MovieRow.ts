import { TMovie } from "../../../../shared/types";
import { formatDate } from "../../common/date-util";

class MovieRow extends HTMLTableRowElement {
  private _movie: TMovie | undefined;

  constructor() {
    super();
    this._movie = undefined;
  }

  set movie(value: TMovie) {
    this._movie = value;
    this.render();
  }

  render() {
    if (this._movie) {
      this.innerHTML = `
        <td>${this._movie.title}</td>
        <td>${formatDate(new Date(this._movie.released))}</td>
        <td>${this._movie.imdb.rating}</td>
        <td>
          <a href="/movies/${this._movie._id}">Edit</a>
        </td>
      `;
    }
  }
}

export default MovieRow;
