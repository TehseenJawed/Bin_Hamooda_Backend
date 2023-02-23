const httpStatus = require("http-status");
const vendorService = require("./model.service");
const { User, Vendor, Chat } = require("../models");
const ApiError = require("../utils/APIError");
const mailService = require("./mail.service");
const moment = require("moment");
const config = require("../config/config");
const { tokenTypes } = require("../config/tokens");
const jwt = require("jsonwebtoken");

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (req) => {
  const check = await vendorService.getVendorByEmail(req.body.email);
  if (check) {
    throw new ApiError(httpStatus.ACCEPTED, "email already taken");
  }
  if (await User.isEmailTaken(req.body.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  if (!req.file) {
    const user = await User.create(req.body);
    return user;
  }
  req.body.profilePicture = req.file.filename;
  const user = await User.create(req.body);
  return user;
};

const verifyUserEmail = async (body) => {
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (body.email.match(regexEmail)) {
    const user = await getUserByEmail(body.email);

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "invalid user email");

    } else {
      const otp = Date.now().toString().slice(-6);
      const temp = await User.findByIdAndUpdate(
        user.id,
        {
          token: otp,
        },
        { new: true }
      );

      mailService.sendMailThroughMailgun({ email: user.email, token: otp });
      return "OTP sent to your Email";
    }

  }
};

const checkOTP = async (otp) => {
  const user = await User.findOne({ token: otp });
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "wrong otp");
  }
  const diffInMinutes = moment().diff(moment(user.updatedAt), "minutes");

  if (diffInMinutes > 5) {
    throw new ApiError(
      httpStatus.ACCEPTED,
      "the OTP you sent has been expired"
    );
  }
  return user;
};

const generateToken = (
  userId,
  userRole,
  expires,
  type,
  secret = config.jwt.secret
) => {
  const payload = {
    sub: userId,
    role: userRole,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    "minutes"
  );

  const accessToken = generateToken(
    user.id,
    user.role,
    accessTokenExpires,
    tokenTypes.ACCESS
  );

  const refreshTokenExpires = moment().add(
    config.jwt.refreshExpirationDays,
    "days"
  );

  const refreshToken = generateToken(
    user.id,
    user.role,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

const updatePassword = async (userId, updateBody) => {
  console.log(" -------->>>   ", updateBody)
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  // updateBody.password = await bcrypt.hash(user.password, 8);
  // console.log(userId, user)
  Object.assign(user, updateBody);
  await user.save();
  console.log("USER .....",user)
  return user;
  // const newuser = await User.findByIdAndUpdate(user.id, updateBody, { new: true })
  // console.log(newuser, "<== updaated Us er")
  // return newuser;
};

const getUserByEmail = async (email, otp) => {
  // const temp = await User.findByIdAndUpdate(
  //   user.id,
  //   {
  //     token: otp,
  //   },
  //   { new: true }
  // );
  return User.findOneAndUpdate(
    { email },
    {
      token: otp
    },
    { new: true }
  )

};

const createUserByGoogleId = async (body) => {
  const user = await User.create(body);
  return user;
};

const getUserByGoogleId = async (token) => {
  console.log(token, "<=== this is token");
  const user = await User.findOne({ googleId: token });
  return user;
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options, "customer_id");
  return users;
};

const getAllUsers = async (filters, options, populate = null) => {
  const users = await User.paginate(filters, options, populate);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(httpStatus.ACCEPTED, "no such user exists");
  }
  return user;
};

const getUserByIdForSearchInChat = async (id) => {
  const user = await User.findById(id);
  return user;
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByPhone = async (phone) => {
  return await User.findOne({ phone });
};

const getUserByFacebookToken = async (facebookId) => {
  const user = await User.findOne({ facebookId });
  return user;
};

const getUserByCustomerId = async (customer_id) => {
  return User.findOne({ customer_id: customer_id });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, req) => {
  const check = await getUserById(userId);
  console.log(req.file);
  if (req.file) {
    req.body.profilePicture = req.file.filename;
  }
  if (req.body.email && (await User.isEmailTaken(req.body.email, check.id))) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  console.log(req.body);
  const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
  console.log(user, "<========");
  return user;
};

const checkArray = (array, value) => {
  console.log("======in check array=======");
  console.log(array, "<=====array");
  console.log(value, "<=====value");
  for (i = 0; i < array.length; i++) {
    if (array[i] == value) return 1;
  }
  console.log("======in check array=======");
  return 0;
};

function arrayRemove(arr, value) {
  return arr.filter(function (element) {
    return element != value;
  });
}

const followUser = async (user1, user2) => {
  user1.followingUser.unshift(user2.id);
  user2.followers.unshift(user1.id);
  await User.findByIdAndUpdate(user1.id, {
    followingUser: user1.followingUser,
  });
  await User.findByIdAndUpdate(user2.id, { followers: user2.followers });
  return 1;
};

const followShop = async (user, shop) => {
  user.followingShop.unshift(shop.id);
  shop.followerUser.unshift(user.id);
  await User.findByIdAndUpdate(user.id, {
    followingShop: user.followingShop,
  });
  await Vendor.findByIdAndUpdate(shop.id, { followerUser: shop.followerUser });
  return 1;
};

const unfollowUser = async (user1, user2) => {
  //user 1 is unfollowing user 2
  const unfollower = arrayRemove(user1.followingUser, user2.id); //here is array of user 1 after removing
  const unfollowee = arrayRemove(user2.followers, user1.id); //here is the array of user 2 after removing
  await User.findByIdAndUpdate(user1.id, { followingUser: unfollower });
  await User.findByIdAndUpdate(user2.id, { followers: unfollowee });
  return 1;
};

const unfollowShop = async (user, shop) => {
  //user  is unfollowing shop
  const unfollower = arrayRemove(user.followingShop, shop.id); //here is array of user  after removing
  const unfollowee = arrayRemove(shop.followerUser, user.id); //here is the array of shop after removing
  await User.findByIdAndUpdate(user.id, { followingShop: unfollower });
  await Vendor.findByIdAndUpdate(shop.id, { followerUser: unfollowee });
  return 1;
};

const followUserById = async (id, body) => {
  console.log(id, "<======follower");
  console.log(body.userId, "<======followee");

  const follower = await getUserById(id);
  const followee = await getUserById(body.userId);
  const check = checkArray(followee.followers, id);
  console.log(check, "<==========check");
  if (check) {
    throw new ApiError(
      httpStatus.CONFLICT,
      "user already following the other user"
    );
  }
  const process = await followUser(follower, followee);
  if (!process) {
    throw new ApiError(
      httpStatus.CONFLICT,
      "something went wrong ,please try later"
    );
  }
  return "sucessfully followed";
};

const unfollowUserById = async (id, body) => {
  console.log(id, "<=====followerID");
  console.log(body.userId, "<=====followee");
  const follower = await getUserById(id);
  const followee = await getUserById(body.userId);
  const check = checkArray(follower.followingUser, body.userId);
  console.log(check, "<==========check");
  if (!check) {
    throw new ApiError(httpStatus.CONFLICT, "no longer following user");
  }
  const process = await unfollowUser(follower, followee);
  if (!process) {
    throw new ApiError(
      httpStatus.CONFLICT,
      "something went wrong ,please try later"
    );
  }
  return "sucessfully unfollowed";
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  await user.remove();
  return user;
};

const deleteUserByCustomerId = async (customer_id) => {
  const user = await getUserByCustomerId(customer_id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  await user.remove();
  return user;
};

const followShopById = async (id, body) => {
  console.log(id, "<======follower");
  console.log(body, "<======followee");

  const follower = await getUserById(id);
  const followee = await vendorService.getVendorById(body.shopId);
  const check = checkArray(followee.followerUser, id);
  console.log(check, "<==========check");
  if (check) {
    throw new ApiError(httpStatus.CONFLICT, "user already following the shop");
  }
  const process = await followShop(follower, followee);
  if (!process) {
    throw new ApiError(
      httpStatus.CONFLICT,
      "something went wrong ,please try later"
    );
  }
  return "sucessfully followed";
};

const unfollowShopById = async (id, body) => {
  console.log("unfollow shop");
  console.log(id, "<======follower");
  console.log(body, "<======followee");

  const follower = await getUserById(id);
  const followee = await vendorService.getVendorById(body.shopId);
  const check = checkArray(followee.followerUser, id);
  console.log(check, "<==========check");
  if (!check) {
    throw new ApiError(httpStatus.CONFLICT, "no longer following this shop");
  }
  const process = await unfollowShop(follower, followee);
  if (!process) {
    throw new ApiError(
      httpStatus.CONFLICT,
      "something went wrong ,please try later"
    );
  }
  return "sucessfully unfollowed";
};

const getUserByIdForChat = async (options, id) => {
  const user = await User.findById(id)
    .populate("followers")
    .populate("followingUser")
    .populate("followingShop");
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  const users = user.followers.concat(user.followingUser, user.followingShop);
  const limit = parseInt(options.limit, 10) || 10;
  const page = parseInt(options.page, 10) || 1;
  const totalResults = users.length;
  const skipper = (page - 1) * limit;
  const Pages = Math.ceil(totalResults / limit);
  const result = users.slice(skipper, skipper + limit);

  return { limit, page, totalResults, Pages, result };
};


module.exports = {
  createUser,
  queryUsers,
  getUserByEmail,
  verifyUserEmail,
  checkOTP,
  generateAuthTokens,
  updatePassword,
  getAllUsers,
  getUserById,
  getUserByPhone,
  getUserByCustomerId,
  updateUserById,
  deleteUserById,
  deleteUserByCustomerId,
  getUserByGoogleId,
  createUserByGoogleId,
  getUserByFacebookToken,
  followUserById,
  unfollowUserById,
  followShopById,
  unfollowShopById,
  getUserByIdForChat,
  getUserByIdForSearchInChat,
};
