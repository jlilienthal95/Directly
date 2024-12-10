const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// router.use((res, req, next) => {
//     req.url = '/graphql'
//     next()
// })
// Define routes for users

// Get all users
router.get('/', userController.getAllUsers);

// Get user by ID
router.get('/:id', userController.getUser);


module.exports = router;
