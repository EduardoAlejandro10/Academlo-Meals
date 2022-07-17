// Models
const { Meal } = require('../models/meal.model');
const { Restaurant } = require('../models/restaurant.model');

// Utils
const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');

const mealsExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const {mealId} = req.body;

	const meal = await Meal.findOne({ where: {id: id || mealId }, include: [{ model: Restaurant }] });

	if (!meal) {
		return next(new AppError('meals not found', 404));
	}

	req.meal = meal;
	next();
});






module.exports = { mealsExists };
