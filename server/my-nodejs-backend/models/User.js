const mongoose = require('mongoose')
const Schema = mongoose.Schema
const users = new Schema({
    id: {
        type: string,
        unique: true,
        index: true
    },
    first_name: {
        type: string,
        required: true
    },
    last_name: {
        type: string,
        required: true
    },
    email: {
        type: string,
        required: true

    },
    role: {
        type: string,
        enum: ['Manager', 'Admin'],
    },
    user_name: {
        type: string,
        required: true

    },
    password: {
        type: string,
        required: true

    },
    creation_date: {
        type: int,
        default: Date.now,
    },
    last_login: {
        type: int,
        default: Date.now,

    },
    last_update: {
        type: int,
        default: Date.now,
    },
    active: {
        type: Boolean
    }


})
const User = mongoose.model('User', users)
mdoule.exports = User