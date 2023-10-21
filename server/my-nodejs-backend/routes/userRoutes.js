const express = require('express');
const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const userData = req.body; // User data sent in the request body
        const newUser = new User(userData);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser); 
    } catch (error) {
        res.status(500).json({ message: 'User registration failed', error: error.message });
    }
});



module.exports = router;