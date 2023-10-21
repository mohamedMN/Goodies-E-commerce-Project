const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config();
const PORT = process.env.PORT
const dbURI = process.env.DB_URI;

const connection = async () => {
    try {
        mongoose.connect(dbURI)
        console.log("connected to db");
    } catch (error) {
        console.error(err);
    }
}
// calling connection function
connection();

// Middleware and routes setup
app.use(express.json());
// Import and use routes
const userRoutes = require('./routes/userRoutes');
const APP = require('./app');
app.use('/', APP);
app.use('/users', userRoutes);


app.listen(PORT, () => {
    console.log("Server on start  http://localhost:" + PORT);
});