
const express = require('express');

// Connection Require***********************
const { connectMongoDb } = require("./connection")

// Routes Require**************************
const userRouter = require('./routes/user')

// Middlewares Require*********************
const { logReqRes } = require('./middlewares')

const app = express();
const PORT = 8000;

// Mongodb Connection......................................
connectMongoDb("mongodb://127.0.0.1:27017/my-app")
    .then(() => console.log("Mongodb Connected"))

// Middleware -Plugin............................................
app.use(express.urlencoded({ extended: false }))
// Middleware-log.txt............................................
app.use(logReqRes("./middlewares/log.txt"))

// Router..........................................................
app.use("/api/users", userRouter)



app.listen(PORT, () => { console.log(`Server Started ar port ${PORT}`); });
 