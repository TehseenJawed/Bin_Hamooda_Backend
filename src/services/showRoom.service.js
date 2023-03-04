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

const getShowRoomById = async (id) => {
  return ShowRoom.findById(id);
};

const createShowRoom = async (body) => {
  const showRoom = await ShowRoom.create(body);
  return showRoom;
};

const getAllShowRoom = async () => {
  const showRoom = await ShowRoom.find();
  return showRoom
}

const deleteShowRoom = async (id) => {
  const showroom = await getShowRoomById(id);
  if (!showroom) {
    throw new ApiError(httpStatus.NOT_FOUND, "Showroom not found.");
  }
  await showroom.remove();
  return showroom;
};

const updateShowRoom = async (id, update) => {
  const showroom = await getShowRoomById(id);
  if (!showroom) {
    throw new ApiError(httpStatus.NOT_FOUND, "Showroom not found.");
  }
  return ShowRoom.findByIdAndUpdate(
    id,
    update
  )
};

module.exports = {
  createShowRoom,
  queryShowRoom,
  getAllShowRoom,
  deleteShowRoom,
  updateShowRoom,
};
