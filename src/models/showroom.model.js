const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const showroomSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
// add plugin that converts mongoose to json
showroomSchema.plugin(toJSON);
showroomSchema.plugin(paginate);
const Category = mongoose.model("showroom", showroomSchema);
module.exports = Category;
