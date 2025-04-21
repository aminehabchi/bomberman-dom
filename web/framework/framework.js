import { updateDOM } from "./helpers.js";
import { NotFoundComponent } from "./component.js";
import { render } from "./helpers.js";

export class Framework {
  constructor() {
    this.routes = {};
    this.oldVTree = null; // Store the old Virtual DOM
    this.state = {}; // Global state object
  }

  route(path, component) {
    this.routes[path] = component;
  }

  // State management methods
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.renderCurrentRoute();
  }

  getState() {
    return this.state;
  }
  // Render the current route
  renderCurrentRoute() {
    const path = window.location.pathname;

    // First check if we have a direct path match
    if (this.routes[path]) {
      const ComponentClass = this.routes[path];
      const component = new ComponentClass(this); // Pass framework instance to component
      const newVTree = component.render(); // Get Virtual DOM

      const appContainer = document.querySelector("#app");

      if (this.oldVTree) {
        updateDOM(appContainer.firstChild, this.oldVTree, newVTree);
      } else {
        appContainer.appendChild(render(newVTree)); // First render
      }

      this.oldVTree = newVTree; // Update old Virtual DOM
    }
    // If no matches, use the not found component
    else {
      const ComponentClass = NotFoundComponent;
      const component = new ComponentClass(this);
      const newVTree = component.render();

      const appContainer = document.querySelector("#app");

      if (this.oldVTree) {
        updateDOM(appContainer.firstChild, this.oldVTree, newVTree);
      } else {
        appContainer.appendChild(render(newVTree));
      }

      this.oldVTree = newVTree;
    }
  }

  start() {
    const navigateTo = () => {

      this.renderCurrentRoute();
    };

    window.addEventListener("hashchange", navigateTo);
    navigateTo(); // Load initial route
  }
}









