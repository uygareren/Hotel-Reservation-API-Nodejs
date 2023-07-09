const express = require('express');
const router = express.Router();
const UserController = require('../controllers/User');
const {verifyAdmin, verifyUser} = require('../middleware/auth');

router.put('/users/:id',verifyUser, UserController.updateUser);
router.delete('/users/:id',verifyUser, UserController.deleteUser);
router.get('/users', verifyAdmin, UserController.getAllUser);
router.get('/users/:id',verifyUser ,UserController.getDetailUser);

module.exports = router;
