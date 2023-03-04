const { modelService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");
const pick = require("../utils/pick");

const createModel = catchAsync(async (req, res) => {
  const vendor = await modelService.createModel(req);
  res.status(httpStatus.CREATED).send(vendor);
});

const getModel = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["email", "userName", "firstName", "userId"]);
  const options = pick(req.query, ["sortby", "limit", "page"]);
  const vendor = await modelService.getModel(filter, options);
  res.status(200).send(vendor);
});

const deleteModel = catchAsync(async (req, res) => {
  const model = await modelService.deleteModel(req.params.id);
  res.status(httpStatus.ACCEPTED).send(model);
});

const updateModel = catchAsync(async (req, res) => {
  const result = await modelService.updateModel(req.params.id, req.body);
  console.log('REQ ------>>> ',req.params.id, req.body);
  res.send(result).status(httpStatus.CREATED);
});

module.exports = {
  createModel,
  getModel,
  updateModel,
  deleteModel,
};
