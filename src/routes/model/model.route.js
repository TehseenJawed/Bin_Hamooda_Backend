const express = require("express");
const {modelController} = require("../../controllers");
const upload = (require = require("../../middlewares/upload"));
const router = express.Router();

router
  .route("/")
  .get(modelController.getModel)
  .post( modelController.createModel);
  
  router
  .route("/:id")
  .delete(modelController.deleteModel)

module.exports = router;
