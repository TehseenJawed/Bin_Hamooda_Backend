const { Router } = require("express");
const { userController } = require("../../controllers");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const userValidation = require("../../validations/user.validation");
const upload = require("../../middlewares/upload");

const router = Router();

router
  .route("/")
  .post(upload.single("profilePicture"), validate(userValidation.createUser), userController.createUser)
  .get(userController.getAllUser);

router
  .route("/request-otp")
  .post(userController.verifyUserEmail);

router
  .route("/verify-otp")
  .post(userController.changePassword);

router
  .route("/changepassword/:id")
  .patch(auth(), userController.updatePassword);

router
  .route("/followUser/:id")
  .post(userController.followUser)
  .delete(userController.unfollowUser);
router
  .route("/followShop/:id")
  .post(userController.followShop)
  .delete(userController.unfollowShop);

router
  .route("/:id")
  .get(userController.getUserById)
  .delete(userController.deleteUser)
  .patch(upload.single("profilePicture"), userController.updateUserById);





module.exports = router;
