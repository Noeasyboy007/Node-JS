const express = require('express');
const users = require('./MOCK_DATA.json');
const fs = require('fs')

const app = express();
const PORT = 8000;

// Middleware.........................................................................
app.use(express.urlencoded({ extended: false }))


// my custom middleware...............................................................
app.use((req, res, next) => {
    fs.appendFile('./07_rest_api/log.txt', `${Date.now()}: ${req.method}: ${req.path}\n`, (err, data) => {

        next();
    })
    // console.log("Hello Form Middleware 1")
    // return res.json({msg: 'Hello form middleware 1'})
})


// ROUTS..........................................................................................
// Render HTML page.............................................
app.get('/users', (req, res) => {
    const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>`
    res.send(html);
})

// Render json data..............................................
app.get('/api/users/', (req, res) => {
    return res.json(users);
})


// Render jsonn data Dynamically path............................
app
    .route("/api/users/:id")

    .get((req, res) => {

        const id = Number(req.params.id)

        const user = users.find((user) => user.id === id)

        return res.json(user);
    })

    .patch((req, res) => {
        const id = Number(req.params.id);
        const updatedFields = req.body;

        // Find the index of the user with the given ID
        const index = users.findIndex(user => user.id === id);
        if (index !== -1) {
            // Update the user object with the provided fields
            Object.assign(users[index], updatedFields);

            // Write the updated data back to the JSON file
            fs.writeFile('./07_rest_/MOCK_DATA.json', JSON.stringify(users), (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Failed to update user data.' });
                }
                return res.json({ status: 'success', message: 'User updated successfully.' });
            });
        } else {
            return res.status(404).json({ error: 'User not found.' });
        }
    })


    .delete((req, res) => {
        const id = Number(req.params.id);

        // Find the index of the user with the given ID
        const index = users.findIndex(user => user.id === id);
        if (index !== -1) {
            // Remove the user from the array
            users.splice(index, 1);

            // Write the updated data back to the JSON file
            fs.writeFile('./07_rest_api/MOCK_DATA.json', JSON.stringify(users), (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Failed to delete user.' });
                }
                return res.json({ status: 'success', message: 'User deleted successfully.' });
            });
        } else {
            return res.status(404).json({ error: 'User not found.' });
        }
    })


app.post('/api/users', (req, res) => {
    const body = req.body;

    users.push({ ...body, id: users.length + 1 })

    fs.writeFile('./07_rest_api/MOCK_DATA.json', JSON.stringify(users), (err, data) => {

        return res.json({ status: "sucess", id: users.length });
    })
    // console.log('Body', body);

})




app.listen(PORT, () => { console.log(`Server Started ar port ${PORT}`); });