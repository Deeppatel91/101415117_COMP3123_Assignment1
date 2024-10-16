const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const router = express.Router();

router.post('/signup', [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 characters').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { username, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User Already Exists' });
        }
        user = new User({username, email, password
        });
        await user.save();
        res.status(201).json({ message: 'User created successfully.', user_id: user._id });
    } catch (error) {
        res.status(500).json({ message: 'Server error creating user', error });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid User email' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Password' });
        }
        res.status(200).json({ message: 'Login successful.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error!', error });
    }
});
module.exports = router;
