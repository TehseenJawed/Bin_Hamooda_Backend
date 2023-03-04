const httpStatus = require("http-status");
const { userService, tokenService, productService, modelService, brandService, showRoom } = require("../services");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");

const getCompleteData = catchAsync(async (req, res) => {
  const product = await productService.getAllProducts();
  const model = await modelService.getAllModel();
  const brand = await brandService.getAllBrand();
  const showroom = await showRoom.getAllShowRoom();
  
  res.send({ product, model, brand, showroom });
});
module.exports = {
  getCompleteData,
};
