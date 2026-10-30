// get - get data from teh server
// post - post an entirely new entry on the server
// put - replace an old entry with a new one
// patch - update some aspects of an existing entry on the server
// delete - delete an entry entirely
//___________________________________________________________________________________________________________________________________________//

const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === "/" && req.method === "GET") {
        res.end("welcome to server");
    }
    else if(req.url === "/about" && req.method === "GET") {
        res.end("welcome to about page");
    }
    else if(req.url === "/contact" && req.method === "GET") {
        res.end("welcome to contact page");
    }
    else if(req.url === "/login" && req.method === "POST") {
        res.end("welcome to login page");
    }
    else if(req.url === "/signup" && req.method === "POST") {
        res.end("welcome to signup page");
    }
    else{
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.end("invalid request");
    }
});

server.listen(3111, () => {
    console.log("server is running on http://localhost:3111");
});