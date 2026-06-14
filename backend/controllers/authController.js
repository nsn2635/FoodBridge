const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/*
Listen carefully to what we are doing here. 
First, we extract exactly what we need from the incoming request body. 
Instead of just blindly tossing this data to the database and hoping it works, 
we act as a strict gatekeeper. We explicitly check: "Hey, did the frontend actually send the name, email, password, and role?" 
If even one of these is missing or undefined, we immediately kick the request back with a 400 error. 
Only after passing this check do we move forward to check for existing users, hash the password, and save.
*/

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: 'All fields are strictly required.' });
        }
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error during registration' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({ token, role: user.role, userId: user._id });
    } catch (error) {
        res.status(500).json({ message: 'Server error during login' });
    }
};

module.exports = { register, login };