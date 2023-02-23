const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const BrandSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
// add plugin that converts mongoose to json
BrandSchema.plugin(toJSON);
BrandSchema.plugin(paginate);
const SubCategory = mongoose.model("brand", BrandSchema);
module.exports = SubCategory;
 