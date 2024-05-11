const fs =  require("fs")


// UpdateFile Using sync filesystem----------------------------------------------------------------
fs.appendFileSync("./02_FileSystem/updateFile/update.txt", `${Date.now()} Aritra Bera :- 7003336313\n`)