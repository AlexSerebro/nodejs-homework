const express = require("express");

const { cntrWrapper } = require("../../helpers");

const { validation } = require("../../midlwares");
const auth = require("../../controlers/auth");
const { joiRegisterSchema, joiLoginSchema } = require("../../models/user");

const router = express.Router();

router.post(
  "/signup",
  validation(joiRegisterSchema),
  cntrWrapper(auth.register)
);
router.post("/login", validation(joiLoginSchema), cntrWrapper(auth.login));

module.exports = router;
