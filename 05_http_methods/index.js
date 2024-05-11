const http = require('http');
const fs = require('fs');
const url = require('url');

const myServer = http.createServer((req, res) => {

    // for log file remove favicon text log
    if (req.url === '/favicon.ico') return res.end()

    // For log txt file data
    const log = `${Date.now()} ${req.method} ${req.url}:- Recived New request form Sever\n`;

    const myUrl = url.parse(req.url)
    // console.log(myUrl);

    // For Creating new log file and update request
    fs.appendFile('./05_http_methods/log.txt', log, (err, data) => {

        switch (req.url) {
            case "/":
                if (req.method === 'GET') res.end("Home Page")
                break;

            case "/about":
                res.end("I am Aritra Bera")
                break;

            case "/login":
                if (req.method === 'GET') res.end("Login Page")
                else if (req.method === 'POST') {
                    // DB Query
                    res.end("Success")
                }
                break;

            default:
                res.end("404 Not Found");
                break;
        }

        // res.end("Hello Form Server!");

    })
    console.log("Response Recived!");
});


myServer.listen(8000, () => console.log("Server Started"));

