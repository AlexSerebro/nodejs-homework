const express = require("express");

const { cntrWrapper } = require("../../helpers");

const { validation, validateId } = require("../../midlwares");
const auth = require("../../controlers/auth");

const router = express.Router();

router.post("/register", cntrWrapper(auth.register));

module.exports = router;
