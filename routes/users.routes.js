const express = require('express');



// Controllers
const {
createUser,
login,
updateUser,
deleteUser,
getAllOrders,
getOrderById
} = require('../controllers/users.controller');


// Middleware
const { createUserValidators } = require('../middlewares/validators.middleware');

const { userExists } = require('../middlewares/users.middleware');
const {orderExists} = require('../middlewares/orders.middleware');
const { 
  protectSession,
  protectUserAccount
} = require('../middlewares/auth.middleware');

const usersRouter = express.Router();

usersRouter.post('/signup', createUserValidators,  createUser);
usersRouter.post('/login', login)
usersRouter.patch('/:id',   protectSession, userExists, protectUserAccount,   updateUser)
usersRouter.delete('/:id',  protectSession,  userExists, protectUserAccount, deleteUser)
usersRouter.get('/orders',  protectSession,  getAllOrders)
usersRouter.get('/orders/:id', protectSession,  orderExists,  getOrderById)


module.exports = { usersRouter };
