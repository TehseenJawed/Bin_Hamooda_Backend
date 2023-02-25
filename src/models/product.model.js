const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const productSchema = mongoose.Schema({
  title: { type: String, required: true },
  demand: { type: String, required: true },
  engine: { type: String, required: true },
  exterior_color: { type: String, required: true },
  fuel_type: { type: String, required: true },
  year: { type: String, required: true },
  doors: { type: String, required: true },
  interior_color: { type: String, required: true },
  images: [
    {
      type: String,
      required: false,
      trim: true,
    },
  ],
});
// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);
const Product = mongoose.model("product", productSchema);
module.exports = Product;
