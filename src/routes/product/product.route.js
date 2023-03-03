const { Router } = require("express");
const { productController } = require("../../controllers");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const upload = require("../../middlewares/upload");

const router = Router();

router
  .route("/")
  .post(upload.array("images"), productController.createProduct)
  .get(productController.getProducts);
router
  .route("/:id")
  // .get(commentController.getComment)
  .delete(productController.deleteProduct)
  .patch(upload.array("images"), productController.updateProduct);

module.exports = router;
