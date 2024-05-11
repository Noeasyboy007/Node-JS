// File System require**************************
const fs = require('fs')

// Append Text File Function******************
function logReqRes(filename) {
    return (req, res, next) => {
        fs.appendFile(
            filename,
                `${req.method}: ${req.path}\n`,
            (err, data) => {
                next()
            }
        )
    }
}

module.exports = {
    logReqRes,
}