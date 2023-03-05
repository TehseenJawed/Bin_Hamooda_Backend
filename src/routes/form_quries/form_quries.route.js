const express = require("express");
const formQuriesController = require("../../controllers/formQuries.controller");
const path = require("path");
const upload = require("../../middlewares/upload");

const router = express.Router();

router
  .route("/")
  .get(formQuriesController.getFormQuries)
  .post(formQuriesController.createFormQuries);

// router.route("/find").get(productController.getProductCondition);

// router
//   .route("/:id")
//   .delete(productController.deleteProduct)
//   .patch(productController.updateProduct)
//   .get(productController.getProduct);

module.exports = router;
