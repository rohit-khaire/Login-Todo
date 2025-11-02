const express = require('express');
const router = express.Router();
const User = require('../model/usermodel');
const jwt = require('jsonwebtoken');



// Signup Route
// Backend signup route (auth.js)
// Signup Route
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body; // Remove fullname
    try {
        const user = new User({ username, email, password });
        await user.save();
        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(201).json({ token, message: 'User created successfully' });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }
        res.status(400).json({ error: 'User could not be created' });
    }
});




// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Invalid email or password' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });

        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(200).json({ token, message: 'Logged in successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

module.exports = router;
