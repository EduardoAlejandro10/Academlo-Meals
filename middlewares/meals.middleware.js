// Models
const { Meal } = require('../models/meal.model');

// Utils
const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');

const mealsExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const meal = await Meal.findOne({ where: { id } });

	if (!meal) {
		return next(new AppError('meals not found', 404));
	}

	req.meals = meal;
	next();
});

module.exports = { mealsExists };
