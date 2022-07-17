const express = require('express');


// Models
const {Order} = require('../models/order.model');
const {User} = require('../models/user.model');

// Utils
const {catchAsync} = require('../utils/catchAsync.util');
const {AppError} = require('../utils/appError.util');
const { Restaurant } = require('../models/restaurant.model');



const createOrder = catchAsync(async (req, res, next) => {
   const { sessionUser, meal} = req;
  
  const {quantity, mealId} = req.body;

   const totalPrice = quantity * meal.price

  const newOrder = await Order.create({
    quantity,
    mealId,
    userId: sessionUser.id,
    totalPrice, 
    include: [{model: Restaurant}]
  
    
  });

   res.status(201).json({
    status: 'success',
    newOrder,
    message: `your order has been placed successfully and your total is ${totalPrice}`,
  });
});


const getAllUserOrders = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const orders = await Order.findAll({where: {userId: sessionUser.id}, 
    include: [
     {model: Restaurant} ]});

  res.status(200).json({
    status: 'success',
    orders
  });
});


const updateOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  if(order.status !== "active"){
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



