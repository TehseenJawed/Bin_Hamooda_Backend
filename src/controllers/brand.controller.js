const httpStatus = require("http-status");
const { brandService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");

const getBrands = catchAsync(async (req, res) => {
  const filters = pick(req.query, ["category", "name", "type"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await brandService.queryBrand(filters, options);
  res.send(result).status(httpStatus.ACCEPTED);
});
const createBrand = catchAsync(async (req, res) => {
  if (!req.file) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No image or the file type is incorrect. Only PDF or Image are acceptable.");
  } else {
    req.body.image = req.file.filename
    const result = await brandService.createBrand(req.body);
    res.status(httpStatus.CREATED).send(result);
  }
});

const deleteBrand = catchAsync(async (req, res) => {
  const brand = await brandService.deleteBrandById(req.params.id);
  res.send(brand);
});

const updateBrand = catchAsync(async (req, res) => {
  const brand = await brandService.updateBrand(req.params.id, req.body);
  res.send(brand).status(httpStatus.CREATED);
});

module.exports = {
  createBrand,
  getBrands,
  deleteBrand,
  updateBrand
};
