const express = require('express')
const { connectToMongoDB } = require('./connection')
const urlRoute = require('./routes/url')
const URL = require('./models/url');

const app = express();

const PORT = 8001;

app.use(express.json())


app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entery = await URL.findOneAndDelete({
        shortId
    },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                }
            },
        })
    res.redirect(entery.redirectURL)

})

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
    .then(() => console.log("MongoDB Connected"))

app.use("/url", urlRoute);

app.listen(PORT, () => console.log("Server started at PORT: ", PORT))