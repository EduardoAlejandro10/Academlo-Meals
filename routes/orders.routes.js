const express = require('express');



// Controllers
const {
createOrder,
getAllUserOrders,
updateOrder,
deleteOrder
} = require('../controllers/orders.controller');


// Middleware


const { orderExists } = require('../middlewares/orders.middleware');

const { 
  protectSession
 
} = require('../middlewares/auth.middleware');
const { mealsExists } = require('../middlewares/meals.middleware');

const ordersRouter = express.Router();

ordersRouter.post('/', protectSession, mealsExists,  createOrder)
ordersRouter.get('/me', protectSession, getAllUserOrders)
ordersRouter.patch('/:id', protectSession, orderExists,  updateOrder)
ordersRouter.delete('/:id', protectSession, orderExists, deleteOrder)




module.exports = { ordersRouter };
