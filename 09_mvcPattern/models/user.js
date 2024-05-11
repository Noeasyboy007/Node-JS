const mongoose = require('mongoose');


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

module.exports= mongoUser;