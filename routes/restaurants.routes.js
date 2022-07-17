const express = require('express');
// Controller
const 
 {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  createReview,
  updateReview,
  deleteReview
 } = require('../controllers/restaurants.controller');
const { adminCheckout } = require('../middlewares/admin.middleware');

 // Middlewares
 const  { protectSession, protectUserAccount } = require('../middlewares/auth.middleware');
 const {restaurantExists} = require('../middlewares/restaurants.middleware');
 const {reviewExists} = require('../middlewares/reviews.middleware');
const { userExists } = require('../middlewares/users.middleware');
 const {createRestaurantValidators} = require('../middlewares/validators.middleware');


 const restaurantsRouter = express.Router();

 restaurantsRouter.post('/', protectSession, createRestaurantValidators, createRestaurant);
  restaurantsRouter.get('/', getAllRestaurants);
  restaurantsRouter.get('/:id', restaurantExists, getRestaurantById);
  restaurantsRouter.patch('/:id', protectSession, userExists,   restaurantExists, adminCheckout, updateRestaurant);
  restaurantsRouter.delete('/:id', protectSession, userExists,  restaurantExists, adminCheckout, deleteRestaurant);
  restaurantsRouter.post('/reviews/:restaurantId', protectSession, createReview);
  restaurantsRouter.patch('/reviews/:id', protectSession,  userExists, protectUserAccount, reviewExists,  updateReview);
  restaurantsRouter.delete('/reviews/:id', protectSession,  userExists, protectUserAccount, reviewExists, deleteReview);
  

module.exports =  { restaurantsRouter };