const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const { query_type } = require("../config/roles");
const productSchema = mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  query_type: {
    type: String,
    enum: query_type,
    default: "quote",
  },
  brand: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "brand",
    required: true,
   },
  model: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "model",
    required: true,
   },
  showroom: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "showroom",
    required: true,
   },
  available_time: { type: String, required: false },
  prefered_date: { type: String, required: false },
  comment: { type: String, required: false },
  ref_id: { type: String, required: false},
  km_driven: { type: String, required: false},
  enquiry_date: {type: String, required: false},
  enquiry_time: {type: String, required: false},
  model_year: {type: String, required: false},
  air_filter: {type: String, required: false},
  exterior_color: {type: String, required: false},
  interior_color: { type: String, required: false},
  upload_pictures: { type: String, required: false},
  vehicle_condition: { type: String, required: false},
  terms_n_conditions: {type: String},
  receiveInformation: {type: String},
});
// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);
const Product = mongoose.model("form_query", productSchema);
module.exports = Product;
