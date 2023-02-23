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
  const result = await brandService.createBrand(req.body);
  res.status(httpStatus.CREATED).send(result);
});

module.exports = {
  createBrand,
  getBrands
};
