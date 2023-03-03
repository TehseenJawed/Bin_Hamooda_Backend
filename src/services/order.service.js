const httpStatus = require("http-status");
const { Order } = require("../models");
const ApiError = require("../utils/APIError");

// const queryColour = async (
//   filter,
//   options,
//   populateFirst = null,
//   populateSecond = null
// ) => {
//   const colour = await Colour.paginate(
//     filter,
//     options,
//     populateFirst,
//     populateSecond
//   );
//   return colour;
// };
// const getColourById = async (id) => {
//   const colour = await Colour.findById(id);
//   if (!colour) {
//     throw new ApiError(httpStatus.ACCEPTED, "no such payment Details Exist");
//   }
//   return colour;
// };

// const updateColourById = async (id, body) => {
//   const colour = await Colour.findByIdAndUpdate(id, body, {
//     new: true,
//   });
//   return colour;
// };
const createOrder = async (body) => {
  const colour = await Order.create(body);
  return colour;
};
// const deleteColourById = async (id) => {
//   await getColourById(id);
//   const colour = await Colour.findByIdAndDelete(id);
//   return colour;
// };
module.exports = {
  createOrder,
  // queryColour,
  // updateColourById,
  // getColourById,
  // deleteColourById,
};
