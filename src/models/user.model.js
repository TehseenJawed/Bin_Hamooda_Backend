const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const { roles } = require("../config/roles");
const { toJSON, paginate } = require("./plugins");
const { required } = require("joi");

const userSchema = mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true, 
      default: ''
    },
    brand: { 
      // type: mongoose.Schema.Types.ObjectId,
      // ref: 'brand' 
      type: String,
      required: true,
    },
    model: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "shop",
      type: String,
      required: true,
    },
    year: { 
      type: String, 
      required: true 
    },
    km_driven: { 
      type: String, 
      required: true 
    },
    exterior_color: { 
      type: String, 
      required: true 
    },
    interior_color: { 
      type: String, 
      required: true 
    },
    total_seats: { 
      type: String, 
      required: true 
    },
    phone: { 
      type: String, 
      required: true
    },
    profile_pic: {
      type: String, 
      required: false
    },
    // followers: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "user",
    //     default: [],
    //     required: true,
    //   },
    // ],
    // followingUser: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "user",
    //     default: [],
    //     required: true,
    //   },
    // ],
    // blockList: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "user",
    //     default: [],
    //   },
    // ],
    // followingShop: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "vendor",
    //     default: [],
    //     required: true,
    //   },
    // ],
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    password: {
      type: String,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
      private: true,
    },
    role: {
      type: String,
      enum: roles,
      default: "client",
    },
    socialPicture: {
      type: String,
    },
    googleId: {
      type: String,
    },
    facebookId: {
      type: String,
    },
  },
  {
    timestaps: true,
  }
);

userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * @typedef User
 */

const User = mongoose.model("user", userSchema);
module.exports = User;