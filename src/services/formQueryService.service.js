const httpStatus = require("http-status");
const { FormQuries } = require("../models");
const { findByIdAndUpdate, create } = require("../models/user.model");
const ApiError = require("../utils/APIError");
const mongoose = require("mongoose");
const queryFormQuries = async (
  filter,
  options,
  populateFirst = "productCondition",
  populateSecond = null
) => {
  const form_query = FormQuries.paginate(
    filter,
    options,
    ["brand", "model", "showroom", "customer"]
  );
  return form_query;
};

const createQuery = async (body) => {
  return FormQuries.create(body);
};

module.exports = {
  createQuery,
  queryFormQuries,
};
