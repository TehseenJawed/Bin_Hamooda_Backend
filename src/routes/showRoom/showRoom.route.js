const { Router } = require("express");
const { showroomController } = require("../../controllers");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const upload = require("../../middlewares/upload");

const router = Router();

router
  .route("/")
  .post(
    showroomController.createShowRoom
  )
  // .get(categoryController.getCategories);
// router
//   .route("/:id")
//   .get(categoryController.getCategory)
//   .delete(categoryController.deleteCategory)
//   .put(categoryController.updateCategory);

module.exports = router;
    