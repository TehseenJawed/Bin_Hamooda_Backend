const httpStatus = require("http-status");
const {
  formQueryService,
} = require("../services");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");
const { getUser } = require("../validations/user.validation");

const createFormQuries = catchAsync(async (req, res) => {
  const result = await formQueryService.createQuery(req.body);
  res.status(httpStatus.CREATED).send({
    status: httpStatus.CREATED,
    result,
  });
});

const getFormQuries = catchAsync(async (req, res) => {
  const filters = pick(req.query, ["brand", "model", "showroom", "customer"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await formQueryService.queryFormQuries(filters, options);
  res.send({
    status: httpStatus.ACCEPTED,
    result,
  }).status(httpStatus.ACCEPTED);
});

module.exports = {
  createFormQuries,
  getFormQuries,
};
