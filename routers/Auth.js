const express = require('express');
const router = express.Router();

const authControllers = require('../controllers/Auth');

router.post('/register', authControllers.Register)
router.post('/login', authControllers.Login)

module.exports = router;