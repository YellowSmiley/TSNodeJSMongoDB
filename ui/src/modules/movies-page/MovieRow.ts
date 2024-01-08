import { TMovie } from "../../../../shared/types";
import { formatDate } from "../../common/date-util";

class MovieRow extends HTMLElement {
  constructor(public movie: TMovie | undefined) {
    super();
    this.render();
  }

  render() {
    if (!this.movie) return;
    this.innerHTML = `
      <tr>
        <td>${this.movie.title}</td>
        <td>${formatDate(new Date(this.movie.released))}</td>
        <td>${this.movie.imdb.rating}</td>
        <td>
          <a href="/movies/${this.movie._id}">Edit</a>
        </td>
      </tr>
    `;
  }
}

export default MovieRow;
