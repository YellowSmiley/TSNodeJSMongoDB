const template = document.createElement("template");
template.innerHTML = `
  <style>
    h1 {
      margin-top: 0
    }
  </style>

  <div>
    <h1>Home</h1>
    <p>Welcome to the home page!</p>
  </div>
`;

class HomePage extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));
  }
}

export default HomePage;
