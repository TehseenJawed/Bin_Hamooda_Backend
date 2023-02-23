const httpStatus = require("http-status");
const { showRoom } = require("../services");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");

const getShowRoom = catchAsync(async (req, res) => {
  const filters = pick(req.query, ["vendor", "isAvailable", "category"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await showRoom.queryShowRoom(filters, options);
  res.send(result).status(httpStatus.ACCEPTED);
});

const createShowRoom = catchAsync(async (req, res) => {
  const category = await showRoom.createShowRoom(req.body);
  res.status(httpStatus.CREATED).send(category);
});
module.exports = {
  getShowRoom,
  createShowRoom
};
