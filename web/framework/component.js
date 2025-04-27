import { createVElement } from "./helpers.js";

export class Component {
  constructor(framework) {
    this.framework = framework;
    this._state = {};
  }

  // this function runs after first run
  Mounting() {}

  //this function runs when path change
  UnMounting() {}

  // State management methods
  setState(name, value) {
    this._state = { ...this._state, ...{ name: value } };
    this.framework.start();
  }

  getState(name) {
    return this._state[name];
  }

  // Base render method
  getVDom() {
    return createVElement("div", {}, ["Component"]);
  }
}

export class NotFoundComponent extends Component {
  getVDom() {
    return createVElement("h1", {}, ["404 - Not Found"]);
  }
}
