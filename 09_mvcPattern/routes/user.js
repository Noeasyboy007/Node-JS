const express = require('express');

const router = express.Router();

const {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser } = require('../controllers/user')



// ROUTS..........................................................................................
router
    .route("/")
    .get(handleGetAllUsers)
    .post(handleCreateNewUser)


// Render jsonn data Dynamically path............................
router
    .route("/:id")

    .get(handleGetUserById)

    .patch(handleUpdateUserById)

    .delete(handleDeleteUserById)



module.exports = router;