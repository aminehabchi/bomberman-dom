import fs from 'fs'


function homeHandler(req, res) {
    const Path = "../../web/index.html"
    fs.readFile(Path, (err, content) => {
        if (err) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Error reading file');
        } else {
            res.statusCode = 200;
            const contentType = getContentType(Path)
            res.setHeader('Content-Type', contentType);
            res.end(content);
        }
    })
}

export default homeHandler