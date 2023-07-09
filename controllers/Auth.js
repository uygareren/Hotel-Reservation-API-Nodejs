const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

exports.Register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (user) {
      return res.status(400).json({ message: 'User already exists!' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password is too short!' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const isValidEmail = emailRegex.test(email);

    if (!isValidEmail) {
      return res.status(400).json({ message: 'Invalid email address!' });
    }

    const newUser = await User.create({ username, email, password: hashedPassword });

    // Generate JWT
    const token = jwt.sign({ userId: newUser._id, isAdmin: newUser.isAdmin }, process.env.SECRET_KEY, { expiresIn: '1h' });

    res.cookie('token', token, { httpOnly: true }).json({
      token,
      newUser
    });
  } catch (error) {
    res.status(500).json(error);
  }
};


exports.Login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password!' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password!' });
      }
  
      // Generate JWT
      const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, process.env.SECRET_KEY, { expiresIn: '1h' });
  
      res.cookie('token', token, { httpOnly: true }).json({ token, user });
    } catch (error) {
      res.status(500).json(error);
    }
  };
