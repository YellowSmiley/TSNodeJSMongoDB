const template = document.createElement("template");
template.innerHTML = `
  <style>
    .nav-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      border-bottom: 1px solid #eee;
      padding: 0 1rem;
      height: 3rem;
    }

    .nav-list {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .nav-item {
      padding: 0 1rem;
    }

    .nav-link {
      color: #333;
      text-decoration: none;
    }
  </style>

  <nav class="nav-bar">
    <ul class="nav-list">
      <li class="nav-item">
        <a class="nav-link" href="/">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/movies">Movies</a>
      </li>
    </ul>
  </nav>
`;

class NavBar extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));
  }
}

export default NavBar;
