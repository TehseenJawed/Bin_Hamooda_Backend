const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const vendorSchema = mongoose.Schema({
  name: { type: String, required: true },
  year: { type: String, },
});

vendorSchema.plugin(paginate);
vendorSchema.plugin(toJSON);

vendorSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

vendorSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

vendorSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});
const Vendor = mongoose.model("model", vendorSchema);

module.exports = Vendor;
