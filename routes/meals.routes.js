const express = require('express');



// Controllers
const {
createMeal,
getAllMeals,
getMealById,
updateMeal,
deleteMeal
} = require('../controllers/meals.controller');


// Middleware
const { createMealsValidators } = require('../middlewares/validators.middleware');
const {adminCheckout} = require('../middlewares/admin.middleware');
const { mealsExists } = require('../middlewares/meals.middleware');

const { 
  protectSession
 
} = require('../middlewares/auth.middleware');
const { userExists } = require('../middlewares/users.middleware');

const mealsRouter = express.Router();

mealsRouter.post('/:id', protectSession, createMealsValidators,  createMeal)
mealsRouter.get('/', getAllMeals)
mealsRouter.get('/:id', mealsExists, getMealById)
mealsRouter.patch('/:id', protectSession, userExists, mealsExists, adminCheckout,  updateMeal)
mealsRouter.delete('/:id', protectSession, userExists, mealsExists, adminCheckout,   deleteMeal)



module.exports = { mealsRouter };
