const { Brand } = require("../models");
const ApiError = require("../utils/APIError");

const queryBrand = async (
  filter,
  options,
  populateFirst = null,
  populateSecond = null
) => {
  const subCategory = await Brand.paginate(
    filter,
    options,
    populateFirst,
    populateSecond
  );
  return subCategory;
};

const createBrand = async (body) => {
  const subCategory = await Brand.create(body);
  return subCategory;
};
module.exports = {
  createBrand,
  queryBrand,
};
