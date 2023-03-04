const httpStatus = require("http-status");
const { userService, tokenService, productService, modelService, brandService, showRoom } = require("../services");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");

const getCompleteData = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  const tokens = await tokenService.generateAuthTokens(user);
  const product = await productService.getAllProducts();
  const model = await modelService.getAllModel();
  const brand = await brandService.getAllBrand();
  const showroom = await showRoom.getAllShowRoom();
  
  res.send({ user, tokens, product, model, brand, showroom });
});
module.exports = {
  getCompleteData,
};
