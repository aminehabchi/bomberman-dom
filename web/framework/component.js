import { createVElement } from "./helpers.js";

export class Component {
    constructor(framework) {
        this.framework = framework;
    }

    // Helper to get state
    getState() {
        return this.framework.getState();
    }

    // Helper to update state
    setState(newState) {
        this.framework.setState(newState);
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