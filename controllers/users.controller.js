const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Models
const { User } = require('../models/user.model');
const  {Restaurant} = require('../models/restaurant.model');

// Utils
const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');
const { Order } = require('../models/order.model');



// Gen secrets for JWT, require('crypto').randomBytes(64).toString('hex')


dotenv.config({ path: './config.env' });

const createUser = catchAsync(async (req, res, next) => {
  const {name, email, password, role} = req.body;


  // Hash password
  const salt = await bcrypt.genSalt(12);
  const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      role,
      password: hashPassword
    });

    // Removing password from the response

    newUser.password = undefined;

    res.status(201).json({
      status: 'success',
      newUser
    });

});


const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

	// Validate credentials (email)
	const user = await User.findOne({
		where: {
			email,
			status: 'active',
		},
	});

	if (!user) {
		return next(new AppError('Credentials invalid', 400));
	}

	// Validate password
	const isPasswordValid = await bcrypt.compare(password, user.password);

	if (!isPasswordValid) {
		return next(new AppError('Credentials invalid', 400));
	}

	// Generate JWT (JsonWebToken) ->
	const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});

	// Send response
	res.status(200).json({
		status: 'success',
		token,
	});
});


const updateUser = catchAsync(async (req, res, next) => {
  const {user} = req
  const {name, email} = req.body;
  
  await user.update({
    name,
    email
  });

  res.status(204).json({ status: 'success'});


});

const deleteUser = catchAsync(async (req, res, next) => {
  const {user} = req
  await user.update({
    status: 'deleted'
  });

  res.status(204).json({ status: 'success'});
});


const getAllOrders = catchAsync(async (req, res, next) => {

  const {sessionUser} = req;

  const orders = await Order.findAll({
    where: {
      userId: sessionUser.id,
    },
    include: [
      { model: User },
    ]
   
  });

  res.status(200).json({
    status: 'success',
    orders
  });
});


const getOrderById = catchAsync(async (req, res, next) => {
  const {order} = req
  

 res.status(200).json({
    status: 'success',
    order,
   
  
  });
    
 
})


module.exports = { createUser, login, updateUser, deleteUser, getAllOrders, getOrderById };