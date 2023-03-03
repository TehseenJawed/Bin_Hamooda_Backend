const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const colourSchema = mongoose.Schema(
  {
    product: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true
     },
    plan_type: { type: String, required: true },
    down_payment: { type: String, required: true },
    plan_months: { type: String, required: true },
    annual_percentage_rate: { type: String, required: true },
    full_amount: { type: String, required: true },
    annual_percentage_rate: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
// add plugin that converts mongoose to json
colourSchema.plugin(toJSON);
colourSchema.plugin(paginate);

const Colour = mongoose.model("order", colourSchema);
module.exports = Colour;
