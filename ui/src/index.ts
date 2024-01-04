// get div by id root
const root = document.getElementById("root");

if (root) {
  // create navbar
  const navbar = document.createElement("nav");
  navbar.className = "navbar navbar-expand-lg navbar-dark bg-dark";
  navbar.innerHTML = `
  <a class="navbar-brand" href="#">Movies</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
`;
  root.appendChild(navbar);
}
