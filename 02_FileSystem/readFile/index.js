const fs = require('fs');


// Read File using sync filesystem----------------------------------------------------------------
// const result = fs.readFileSync("./02_FileSystem/readFile/read.txt","utf-8")
// console.log(result);




// Read File Using Async filesystem----------------------------------------------------------------
fs.readFile("./02_FileSystem/readFile/read.txt","utf-8",(err,result)=>{
    if(err) 
    {
        console.log("Error reading");
    }
    else
    {
        console.log(result);
    }
})

