const express = require("express");

const { cntrWrapper } = require("../../helpers");

const { validation } = require("../../midlwares");
const auth = require("../../controlers/auth");
const { joiRegisterSchema, joiLoginSchema } = require("../../models/user");

const router = express.Router();

router.post(
  "/register",
  validation(joiRegisterSchema),
  cntrWrapper(auth.register)
);

module.exports = router;
