const fs = require('fs');


// Create file using Sync filesystem----------------------------------------------------------------
// fs.writeFileSync('./02_FileSystem/writeFile/test.txt',"Hello world")




// Create file using Async filesystem----------------------------------------------------------------
fs.writeFile("./02_FileSystem/writeFile/test2.txt","Hello world", (err)=>{})