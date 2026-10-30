
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { URL } = require('url');

const notesPath = path.join(__dirname, 'message.txt');
console.log(notesPath);
const server = http.createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost:3000');
    const route = url.pathname;

    // Basic routes
    if (req.method === 'GET' && route === '/') {
        return res.end('Welcome to my server!');
    }

    else if (req.method === 'GET' && route === '/hello') {
        return res.end('Hello! Nice to meet you.');
    }

    else if (req.method === 'GET' && route === '/how-are-you') {
        return res.end('I am doing great. How are you?');
    }

    else if (req.method === 'GET' && route === '/about') {
        return res.end('This server is built using Node.js.');
    }

    // Read a file
    else if (req.method === 'GET' && route === '/file') {
        fs.readFile(notesPath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404);
                return res.end('File not found');
            }

            res.end(data);
        });
    }

    // Get operating system information
    else if (req.method === 'GET' && route === '/system') {
        res.setHeader('Content-Type', 'application/json');

        return res.end(JSON.stringify({
            platform: os.platform(),
            hostname: os.hostname(),
            freeMemory: os.freemem(),
            totalMemory: os.totalmem(),
            cpuCount: os.cpus().length
        }));
    }

    // Read query parameters
    else if (req.method === 'GET' && route === '/search') {
        const name = url.searchParams.get('name');

        return res.end('Hello, ' + (name || 'guest'));
    }

    // Display folder and file information
    else if (req.method === 'GET' && route === '/info') {
        return res.end(
            'Current working directory: ' + process.cwd() +
            '\nServer filename: ' + path.basename(__filename)
        );
    }

    // POST: Save data to a file
    else if (req.method === 'POST' && route === '/message') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            fs.writeFile(notesPath, body, (err) => {
                if (err) {
                    res.writeHead(500);
                    return res.end('Could not save the message');
                }

                res.end('Message saved successfully');
            });
        });
    }

    // PUT: Replace the file contents
    else if (req.method === 'PUT' && route === '/message') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            fs.writeFile(notesPath, body, (err) => {
                if (err) {
                    res.writeHead(500);
                    return res.end('Could not update the message');
                }

                res.end('Message updated successfully');
            });
        });
    }

    // DELETE: Delete the file
    else if (req.method === 'DELETE' && route === '/message') {
        fs.unlink(notesPath, (err) => {
            if (err) {
                res.writeHead(404);
                return res.end('File not found');
            }

            res.end('Message deleted successfully');
        });
    }

    // Unknown route
    else {
        res.writeHead(404);
        res.end('Route not found');
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});



