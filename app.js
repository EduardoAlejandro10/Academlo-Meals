const express = require('express');
const helmet = require("helmet");

const {globalErrorHandler} = require('./controllers/error.controller');



// Routes

const {usersRouter} = require('./routes/users.routes');
const { restaurantsRouter } = require('./routes/restaurants.routes');
const { mealsRouter } = require('./routes/meals.routes');
const {ordersRouter} = require('./routes/orders.routes');

const { AppError } = require('./utils/appError.util');


// initialize express
const app = express();

// Enable incoming JSON
app.use(express.json());

app.use(helmet());

// Define our endpoints
app.use('/api/v1/users', usersRouter );
app.use('/api/v1/restaurants', restaurantsRouter);
app.use('/api/v1/meals', mealsRouter);
app.use('/api/v1/orders', ordersRouter);

//handle incoming unknown routes to the server
app.all('*', (req, res, next) => {
	next(
		new AppError(
			`${req.method} ${req.originalUrl} not found in this server`,
			404
		)
	);
});

app.use(globalErrorHandler);


module.exports = { app };