const http = require('http');
const fs = require('fs');

const myServer = http.createServer((req, res) => {

    const log = `${Date.now()} :- Recived New request form Sever\n`;

    fs.appendFile('log.txt', log, (err, data) => {

        res.end("Hello Form Server!");

    })
    console.log("Response Recived!");
});


myServer.listen(8000, () => console.log("Server Started"));

