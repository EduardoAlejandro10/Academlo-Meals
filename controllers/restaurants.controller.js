const express = "express";

// Models
const { Restaurant } = require("../models/restaurant.model");
const { Review } = require("../models/review.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");

const createRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const newRestaurant = await Restaurant.create({
    name,
    address,
    rating,
  });

  res.status(201).json({
    status: "success",
    newRestaurant,
  });
});

const getAllRestaurants = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurant.findAll({
    where: { status: "active" },
    include: [{ model: Review }],
  });

  res.status(200).json({
    status: "success",
    restaurants,
  });
});

const getRestaurantById = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  res.status(200).json({
    status: "success",
    restaurant,
    reviews: { Review },
  });
});

const updateRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  
  const { name, adress } = req.body;

 

  await restaurant.update({
    name,
    adress,
  });

  res.status(204).json({
    status: "success",
    restaurant,
  });
});

const deleteRestaurant = catchAsync(async (req, res, next) => {
 
  const { restaurant } = req;

 
  await restaurant.update({
    status: "disabled",
  });

  res.status(204).json({ status: "success" });
});

const createReview = catchAsync(async (req, res, next) => {
  const { rating, comment, restaurantId, userId } = req.body;

  const newReview = Review.create({
    restaurantId,
    rating,
    comment,
    userId,
  });

  res.status(201).json({
    status: "success",
    newReview,
  });
});

const updateReview = catchAsync(async (req, res, next) => {
  const { review } = req;  
  
  const { rating, comment } = req.body;


  await review.update({
    rating,
    comment,
  });

  res.status(204).json({
    status: "success",
    review,
  });
});

const deleteReview = catchAsync(async (req, res, next) => {
  const { review } = req;

  await review.update({
    status: "deleted",
  });

  res.status(204).json({ status: "success" });
});

module.exports = {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  createReview,
  updateReview,
  deleteReview,
};
