import HomePage from "./modules/home-page/HomePage";
import ContentRouter from "./modules/content-router/ContentRouter";
import MoviesPage from "./modules/movies-page/MoviesPage";
import NavBar from "./modules/nav-bar/NavBar";
import NotFoundPage from "./modules/not-found-page/NotFoundPage";
import MovieRow from "./modules/movies-page/MovieRow";

customElements.define("nav-bar", NavBar);
customElements.define("content-router", ContentRouter);
customElements.define("not-found-page", NotFoundPage);
customElements.define("home-page", HomePage);

customElements.define("movies-page", MoviesPage);
customElements.define("movie-row", MovieRow);
