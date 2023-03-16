const httpStatus = require("http-status");
const { productService } = require("../services");
const ApiError = require("../utils/APIError");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");

const getProducts = catchAsync(async (req, res) => {
  console.log("wow", req.body);
  const filters = pick(req.query, [""]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await productService.queryProducts(filters, options);
  res.send({
    status: httpStatus.ACCEPTED,
    result
  }).status(httpStatus.ACCEPTED);;
});
// const getAllProducts = catchAsync(async (req, res) => {
//   let product = await productService.getAllProducts();
//   res.status(200).send(product);
// });

// const getProduct = catchAsync(async (req, res) => {
//   const result = await productService.getProductById(req.params.id);
//   res.send(result);
// });
const createProduct = catchAsync(async (req, res) => {
  if (!req.files) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No image or the file type is incorrect. Only PDF or Image are acceptable.");
  } else {
    const images = []
    console.log(req.body.images);
    await req.files.map((v, i) => images.push(v.filename))
    req.body.images = images
    console.log(req.body);
    const result = await productService.createProduct(req.body);
    res.send({
      status: httpStatus.CREATED,
      result
    }).status(httpStatus.CREATED);
  }
});
const updateProduct = catchAsync(async (req, res) => {
  if (!req.files) {
    const result = await productService.updateProductById(req.params.id, req.body);
    res.send({
      status: httpStatus.ACCEPTED,
      result
    }).status(httpStatus.CREATED);
  } else {
    const images = []
    console.log(req.body.images);
    await req.files.map((v, i) => images.push(v.filename))
    req.body.images = images
    console.log(req.body);
    const result = await productService.updateProductById(req.params.id, req.body);
    res.send({
      status: httpStatus.ACCEPTED,
      result
    }).status(httpStatus.ACCEPTED);
  }
  console.log('REQ ------>>> ',req.params.id, req.body);
});
const deleteProduct = catchAsync(async (req, res) => {
  const result = await productService.deleteProductById(req.params.id);
  res.send({
    status: httpStatus.ACCEPTED,
    result
  }).status(httpStatus.ACCEPTED);;
});

// const getProductCondition = catchAsync(async (req, res) => {
//   console.log(req.query, "<====req.query");
//   if (!req.query.productId && !req.query.colourID && !req.query.size) {
//     throw new ApiError(httpStatus.BAD_REQUEST, "data is missing");
//   }
//   const result = await productService.getProductConditionByColorAndSize(
//     req.query
//   );
//   res.status(httpStatus.ACCEPTED).send(result);
// });

module.exports = {
  getProducts,
  // getAllProducts,
  // getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  // getProductCondition,
};
