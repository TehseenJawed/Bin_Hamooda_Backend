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

const getAllBrand = async () => {
  const result = await Brand.find()
  return result
}

const getBrandById = async (id) => {
  return Brand.findById(id);
};

const deleteBrandById = async (id) => {
  const product = await getBrandById(id);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found.");
  }
  await product.remove();
  return product;
};

module.exports = {
  createBrand,
  queryBrand,
  getAllBrand,
  deleteBrandById
};
