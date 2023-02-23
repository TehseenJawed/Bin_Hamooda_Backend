const httpStatus = require("http-status");
const { ShowRoom } = require("../models");
const ApiError = require("../utils/APIError");

const queryShowRoom = async (
  filter,
  options,
  populateFirst = null,
  populateSecond = null
) => {
  const showRoom = await ShowRoom.paginate(
    filter,
    options,
    populateFirst,
    populateSecond
  );
  return showRoom;
};

const createShowRoom = async (body) => {
  const showRoom = await ShowRoom.create(body);
  return showRoom;
};
module.exports = {
  createShowRoom,
  queryShowRoom,
};
