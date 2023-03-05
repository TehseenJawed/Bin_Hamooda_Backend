const httpStatus = require("http-status");
const {
  formQueryService,
} = require("../services");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");
const { getUser } = require("../validations/user.validation");

const createFormQuries = catchAsync(async (req, res) => {
  console.log('REQ -------  ',req.body);
  const response = await formQueryService.createQuery(req.body);
  res.status(httpStatus.CREATED).send(response);
});

const getFormQuries = catchAsync(async (req, res) => {
  const filters = pick(req.query, ["brand", "model", "showroom", "customer"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await formQueryService.queryFormQuries(filters, options);
  res.send(result).status(httpStatus.ACCEPTED);
});

module.exports = {
  createFormQuries,
  getFormQuries,
};
