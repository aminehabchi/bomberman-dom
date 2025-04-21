import homeHandler from "../controllers/home.js"
import loginHandler from "../controllers/login.js"
import serveFilesHandler from "../controllers/serveFiles.js"

function routing(req, res) {
    const path = req.url

    if (path == "/") {
        homeHandler(req, res)
    } else if (path.startsWith("/login")) {
        loginHandler(req, res)
    } else {
        serveFilesHandler(req, res)
    }

}

export default routing