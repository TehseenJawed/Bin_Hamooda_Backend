const { Router } = require("express");
const { brandController } = require("../../controllers");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const upload = require("../../middlewares/upload");

const router = Router();

router
  .route("/")
  .post(upload.single("image"), brandController.createBrand)
  .get(brandController.getBrands);
router
  .route("/:id") 
  // .get(subCategoryController.getSubCategory)
  .delete(brandController.deleteBrand)
  .patch(brandController.updateBrand);

module.exports = router;
    