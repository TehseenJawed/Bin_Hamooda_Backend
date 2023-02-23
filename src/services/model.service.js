const httpStatus = require("http-status");
const { Model } = require("../models");
const ApiError = require("../utils/APIError");

/**
 * Create a Vendor
 * @param {Object} userBody
 * @returns {Promise<User>}
 */

const createModel = async (req) => {
  const check = await getModelByName(req.body.name);
  if (check) {
    throw new ApiError(httpStatus.ACCEPTED, "Model already exist");
  }
  const user = await Model.create(req.body);
  return user;
};

/**
 * Query for Vendors
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */

const getModel = async (filters, options, populateFirst = null) => {
  const vendor = await Model.paginate(filters, options, populateFirst);
  return vendor;
};

const getModelByName = async (name) => {
  return await Model.findOne({ name });
};

module.exports = {
  getModelByName,
  createModel,
  getModel
};
