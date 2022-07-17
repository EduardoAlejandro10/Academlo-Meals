const { body, validationResult } = require('express-validator');

const { AppError } = require('../utils/appError.util');

const checkResult = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		// Array has errors
		const errorMsgs = errors.array().map(err => err.msg);

		const message = errorMsgs.join('. ');

		return next(new AppError(message, 400));
	}

	next();
};

const createUserValidators = [
	body('name').notEmpty().withMessage('Name cannot be empty'),
	body('email').isEmail().withMessage('Must provide a valid email'),
	body('password')
		.isLength({ min: 8 })
		.withMessage('Password must be at least 8 characters long')
		.isAlphanumeric()
		.withMessage('Password must contain letters and numbers'),
	checkResult,
];

const createRestaurantValidators = [
	body('name').notEmpty().withMessage('Name cannot be empty'),
	body('address').notEmpty().withMessage('Adress cannot be empty'),
	checkResult
]

const createMealsValidators = [
	body('name').notEmpty().withMessage('Name cannot be empty'),
	body('price').isNumeric().withMessage('Price must be a number'),
	checkResult
]

module.exports = { createUserValidators, createRestaurantValidators, createMealsValidators };
