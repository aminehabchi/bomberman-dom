import { updateDOM } from "./helpers.js";
import { NotFoundComponent } from "./component.js";
import { VDomToReelDom } from "./helpers.js";

export class Framework {
  constructor() {
    this.routes = {};
    this.oldVTree = null; // Store the old Virtual DOM
    this.App = document.getElementById("app");
    this.state = {}; // Global state object
  }

  route(path, component) {
    this.routes[path] = component;
  }

  // State management methods
  setState(newState) {
    this._state = { ...this._state, ...newState };
    this.start();
  }

  getState(name) {
    return this._state[name];
  }

  // Render the current route
  renderthisPath(path) {
    let newVTree;

    if (this.routes[path]) {
      // First check if we have a direct path match
      const ComponentClass = this.routes[path];
      const component = new ComponentClass(this); // Pass framework instance to component
      newVTree = component.getVDom(); // Get Virtual DOM
    } else {
      const ComponentClass = NotFoundComponent;
      const component = new ComponentClass(this);
      newVTree = component.render();
    }

    if (this.oldVTree) {
      updateDOM(this.App.firstChild, this.oldVTree, newVTree);
    } else {
      this.App.appendChild(VDomToReelDom(newVTree)); // First render
    }

    this.oldVTree = newVTree;
  }

  navigateTo(newPath) {
    // Update the browser's history with the new path without reloading the page
    window.history.pushState({}, "", newPath);

    // Call your custom render method to handle the content change
    this.renderthisPath(newPath);
  }

  start() {
    const path = window.location.pathname;
    this.renderthisPath(path);
  }
}
