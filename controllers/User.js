const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



exports.updateUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    if (email && email !== user.email) {
      const isValidEmail = emailRegex.test(email);
      if (!isValidEmail) {
        return res.status(400).json({ message: 'Invalid email address!' });
      }
    }

    const hashedPassword = password ? await bcrypt.hash(password, 12) : user.password;

    const updatedUser = await User.findByIdAndUpdate(userId, { username, email, password: hashedPassword }, { new: true });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    await User.findByIdAndDelete(userId);

    res.json({ message: 'User deleted successfully!' });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getAllUser = async (req, res, next) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getDetailUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};
