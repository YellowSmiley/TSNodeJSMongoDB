import { routes } from "./Routes";

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
    window.addEventListener("hashchange", this.handlePathChange.bind(this));
    this.navigate(window.location.pathname);
  }

  handlePathChange() {
    const path = window.location.pathname;
    this.navigate(path);
  }

  // render the appropriate component based on the url
  navigate(path: string) {
    const main = this.shadowRoot?.querySelector(".content-router");
    if (!main) return;

    const route = routes.find((route) => {
      if (route.path.includes(":id")) {
        const [basePath] = route.path.split("/:id");
        return path.startsWith(basePath);
      }
      return route.path === path;
    });

    if (route) {
      const component = document.createElement(route.component);
      if (route.path.includes(":id")) {
        const id = path.split("/")[2];
        (component as any).pageId = id;
      }
      main.append(component);
    } else {
      this.innerHTML = "<not-found-page></not-found-page>";
    }
  }
}

export default ContentRouter;
