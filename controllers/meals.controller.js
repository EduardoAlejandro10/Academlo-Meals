const express = require("express");

// Models
const { Restaurant } = require("../models/restaurant.model");
const { Meal } = require("../models/meal.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");


const createMeal = catchAsync(async (req, res, next) => {
  const { name, price, restaurantId} = req.body;

  const newMeal = await Meal.create({ name, price, restaurantId, include: [{ model: Restaurant }] });

  res.status(201).json({
    status: "success",
     newMeal,
  });
});

const getAllMeals = catchAsync(async (req, res, next) => {

  const meals = await Meal.findAll({ where: { status: "active" } , include: [ {model: Restaurant }]}  );

  res.status(200).json({
    status: "success",
    meals,
  });
});

const getMealById = catchAsync(async (req, res, next) => {
  const { meal } = req;

  if (meal.status !== "active") {
    return next(new AppError("Meal not found", 404));
  }

  res.status(200).json({
    status: "success",
    meal,
  });
});


const updateMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;
  const { name, price } = req.body;

  await meal.update({
    name,
    price,
  });

  res.status(200).json({
    status: "success",
    meal,
  });
});


const deleteMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;
  const { user } = req;

  if (user.role !== "admin") {
    return next(new AppError("You are not authorized to delete this meal", 401));
  }

  await meal.update({
    status: "disabled",
  });

  res.status(200).json({
    status: "success"
  });
});


module.exports = { createMeal, getAllMeals, getMealById, updateMeal, deleteMeal };





