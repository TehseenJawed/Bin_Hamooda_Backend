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
    ["model"]
  );
  return subCategory;
};

const createBrand = async (body) => {
  const subCategory = await Brand.create(body);
  return subCategory;
};

const getAllBrand = async () => {
  const result = await Brand.find().populate("models")
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

const updateBrand = async (id, update) => {
  const brand = await getBrandById(id);
  if (!brand) {
    throw new ApiError(httpStatus.NOT_FOUND, "Brand not found.");
  }
  return Brand.findByIdAndUpdate(
    brand.id,
    update
  )
};

module.exports = {
  createBrand,
  queryBrand,
  getAllBrand,
  deleteBrandById,
  updateBrand,
  getBrandById,
};
