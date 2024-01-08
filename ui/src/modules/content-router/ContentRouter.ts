const template = document.createElement("template");
template.innerHTML = `<div class="content-router"></div>`;

class ContentRouter extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));
  }

  // react to changes in the url
  connectedCallback() {
    window.addEventListener("hashchange", this.render.bind(this));
    this.render();
  }

  // render the appropriate component based on the url
  render() {
    const main = this.shadowRoot?.querySelector(".content-router");
    const pathname = window.location.pathname;
    if (!main) return;
    switch (pathname) {
      case "/":
        main.innerHTML = "<home-page></home-page>";
        break;
      case "/movies":
        main.innerHTML = "<movies-page></movies-page>";
        break;
      default:
        main.innerHTML = "<not-found-page></not-found-page>";
        break;
    }
  }
}

export default ContentRouter;
