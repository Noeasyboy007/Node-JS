const mongoUser = require('../models/user')

// Get All User.....................................
async function handleGetAllUsers(req, res) {
    const allDbUser = await mongoUser.find({})
    return res.json(allDbUser);
}
// Get User By Id...................................
async function handleGetUserById(req, res) {
    const user = await mongoUser.findById(req.params.id)
    if (!user) return res.status(404).json({ error: "user not found" })
    return res.json(user);
}
// Update user By Id...................................
async function handleUpdateUserById(req, res) {
    try {
        const updatedUser = await mongoUser.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.json(updatedUser);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
// Delete user By Id......................................
async function handleDeleteUserById(req, res) {
    try {
        await mongoUser.findByIdAndDelete(req.params.id);
        return res.json({ message: "User deleted successfully" });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
// Create New User........................................
async function handleCreateNewUser(req, res) {

    const body = req.body;
    const result = await mongoUser.create({
        fristName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitel: body.job_titel
    })
    return res.status(201).json({ msg: "Sucess", id: result._id })
}

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser
}