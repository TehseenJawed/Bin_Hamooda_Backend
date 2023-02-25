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

module.exports = {
  createFormQuries,
};
