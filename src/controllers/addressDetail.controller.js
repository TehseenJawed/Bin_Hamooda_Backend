const httpStatus = require("http-status");
const { addressDetailService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");

const getAddressessDetails = catchAsync(async (req, res) => {
  const filters = pick(req.query, [
    "userId",
    "shopId",
    "isAvailable",
    "category",
  ]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await addressDetailService.queryAddressDetails(
    filters,
    options
  );
  res.send({
    status: httpStatus.ACCEPTED,
    result,
  }).status(httpStatus.ACCEPTED);
});

const getAddressDetail = catchAsync(async (req, res) => {
  const result = await addressDetailService.getAddressDetailById(req.params.id);
  res.send({
    status: httpStatus.ACCEPTED,
    result,
  }).status(httpStatus.ACCEPTED);
});
const createAddressDetail = catchAsync(async (req, res) => {
  const addressDetail = await addressDetailService.createAddressDetail(
    req.body
  );
  res.status(httpStatus.CREATED).send(addressDetail);
});
const updateAddress = catchAsync(async (req, res) => {
  const result = await addressDetailService.updateAddressDetailById(
    req.params.id,
    req.body
  );
  res.send({
    status: httpStatus.ACCEPTED,
    result,
  }).status(httpStatus.ACCEPTED);
});
const deleteAddress = catchAsync(async (req, res) => {
  const result = await addressDetailService.deleteAddressDetailsById(
    req.params.id
  );
  res.send({
    status: httpStatus.ACCEPTED,
    result,
  }).status(httpStatus.ACCEPTED);
});
module.exports = {
  getAddressDetail,
  getAddressessDetails,
  createAddressDetail,
  deleteAddress,
  updateAddress,
};
