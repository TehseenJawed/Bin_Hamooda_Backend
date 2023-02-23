const express = require("express");
const {modelController} = require("../../controllers");
const upload = (require = require("../../middlewares/upload"));
const router = express.Router();

router
  .route("/")
  .get(modelController.getModel)
  .post( modelController.createModel);


module.exports = router;
