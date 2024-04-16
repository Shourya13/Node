const express = require("express");
const router = express.Router();

const { demoController } = require("../controllers/demoController");

router.route("/demo").get(demoController);

module.exports = router;
