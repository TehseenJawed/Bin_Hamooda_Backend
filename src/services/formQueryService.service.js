const httpStatus = require("http-status");
const { FormQuries } = require("../models");
const { findByIdAndUpdate, create } = require("../models/user.model");
const ApiError = require("../utils/APIError");
const mongoose = require("mongoose");
const queryProducts = async (
  filter,
  options,
  populateFirst = "productCondition",
  populateSecond = null
) => {
  const products = Product.paginate(
    filter,
    options,
    populateFirst,
    populateSecond
  );
  return products;
};
const createQuery = async (body) => {
  return FormQuries.create(body);
};
module.exports = {
  createQuery,
};
