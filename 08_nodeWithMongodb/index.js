const { error } = require('console');
const express = require('express');
const mongoose = require('mongoose');



const app = express();
const PORT = 8000;

// Connection.....................................................................
mongoose
    .connect("mongodb://127.0.0.1:27017/my-app")
    .then(() => console.log("MongoDb Connected"))
    .catch((err) => console.log('MOngo Error', err))


// Schema............................................................................
const userSchema = new mongoose.Schema({
    fristName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    jobTitel: {
        type: String,
    },

    gender: {
        type: String,
    }
}, { timestamps: true })


// Model.............................................................................
const mongoUser = mongoose.model('mongoUser', userSchema)


// Middleware.........................................................................
app.use(express.urlencoded({ extended: false }))



// ROUTS..........................................................................................
// Render HTML page.............................................
app.get('/users', async (req, res) => {
    const allDbUser = await mongoUser.find({})
    const html = `
    <ul>
    ${allDbUser.map((mongoUser) => `<li>${mongoUser.fristName} - ${mongoUser.email}</li>`).join("")}
    </ul>`
    res.send(html);
})

// Render json data..............................................
app.get('/api/users/', async (req, res) => {
    const allDbUser = await mongoUser.find({})
    return res.json(allDbUser);
})


// Render jsonn data Dynamically path............................
app
    .route("/api/users/:id")

    .get(async (req, res) => {

        const user = await mongoUser.findById(req.params.id)

        if (!user) return res.status(404).json({ error: "user not found" })

        return res.json(user);
    })

    .patch(async (req, res) => {
        try {
            const updatedUser = await mongoUser.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedUser) {
                return res.status(404).json({ error: "User not found" });
            }
            return res.json(updatedUser);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    })


    .delete(async (req, res) => {
        try {
            await mongoUser.findByIdAndDelete(req.params.id);
            return res.json({ message: "User deleted successfully" });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    });



app.post('/api/users', async (req, res) => {
    const body = req.body;

    const result = await mongoUser.create({
        fristName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitel: body.job_titel

    })

    console.log(result);

    return res.status(201).json({ msg: "Sucess" })

})




app.listen(PORT, () => { console.log(`Server Started ar port ${PORT}`); });