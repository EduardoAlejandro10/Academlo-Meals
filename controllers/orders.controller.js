const express = require('express');


// Models
const {Order} = require('../models/order.model');
const {Meal} = require('../models/meal.model');
const {Restaurant} = require('../models/restaurant.model');
const {User} = require('../models/user.model');

// Utils
const {catchAsync} = require('../utils/catchAsync.util');
const {AppError} = require('../utils/appError.util');



const createOrder = catchAsync(async (req, res, next) => {
   const { meal} = req;
   
  const {quantity, mealId, userId} = req.body;

   const math = quantity * meal.price

  const newOrder = await Order.create({
    quantity,
    mealId,
    userId,
    totalPrice: math
    
    
    
  });

  res.status(201).json({
    status: 'success',
    newOrder,
    message: `your order has been placed successfully and your total is ${math}`,
  });


});


const getAllUserOrders = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const orders = await Order.findAll({where: {userId: sessionUser.id}, 
    include: [
    { model: User }]});

  res.status(200).json({
    status: 'success',
    orders
  });
});


const updateOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  if(order.status !== 'active'){
    return next(new AppError('Order is not active', 401));
  }
  await order.update({ status: 'completed'});

  res.status(200).json({
    status: 'success',
  
  });

});

const deleteOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

if(order.status !== 'active'){
  return next(new AppError('Order is not active', 401));
}
  await order.update({status: 'cancelled'});

  res.status(200).json({
    status: 'success',
  
  });

});



module.exports = { createOrder, getAllUserOrders, updateOrder, deleteOrder };



