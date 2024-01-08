const template = document.createElement("template");
template.innerHTML = `
  <style>
    h1 {
      margin-top: 0
    }
  </style>

  <div>
    <h1>Oops! Page not found</h1>
  </div>
`;

class NotFoundPage extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));
  }
}

export default NotFoundPage;
