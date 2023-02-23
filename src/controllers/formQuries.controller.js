const httpStatus = require("http-status");
const {
  formQueryService,
} = require("../services");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");
const { getUser } = require("../validations/user.validation");

const createFormQuries = catchAsync(async (req, res) => {
  console.log('REQ -------  ',req.body);
  const user = await formQueryService.createQuery(req.body);
  res.status(httpStatus.CREATED).send({ user });
});

module.exports = {
  createFormQuries,
};
