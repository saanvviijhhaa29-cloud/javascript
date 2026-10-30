
const http = require('http');
const fs = require('fs');

// Create an HTTP server
const server = http.createServer((req, res) => {

    // Home route
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Welcome to my server');
    }

    // About route
    else if (req.url === '/about' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('This is a testing server');
    }

    // Read data from a file
    else if (req.url === '/read' && req.method === 'GET') {

        fs.readFile('message.txt', 'utf8', (err, data) => {

            // Handle errors while reading
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error reading file');
                return;
            }

            // Send file contents
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(data);
        });
    }

    // Write data to a file
    else if (req.url === '/write' && req.method === 'GET') {

        const content = 'I am editing the message.txt file';

        // Create the file or replace its existing contents
        fs.writeFile('message.txt', content, (err) => {

            // Handle errors while writing
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error writing to file');
                return;
            }

            // Send success response
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('File written successfully');
        });
    }

    // Append data to a file
    else if (req.url === '/append' && req.method === 'GET') {

        const content = '\nThis is the appended content';

        // Add content to the end of the file
        fs.appendFile('message.txt', content, (err) => {

            // Handle errors while appending
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error appending to file');
                return;
            }

            // Send success response
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Content appended successfully');
        });
    }

    // Handle routes that do not exist
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page not found');
    }

});

// Start the server on port 3000
server.listen(3000, () => {
    console.log('Server running on port 3000');
});
