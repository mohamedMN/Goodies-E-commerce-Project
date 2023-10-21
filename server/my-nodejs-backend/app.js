const express = require('express');
const app = express();

// Define and use middleware
app.use(express.json());

// Define and use routes
app.get('/', (req, res) => {
    res.send('Hello, this is the main application route.');
});

// Export the Express app for use in server.js
module.exports = app;