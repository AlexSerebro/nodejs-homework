const { User } = require("../../models");
// const { Unauthorized } = require("http-errors");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    status: "success",
    code: 200,
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
};

module.exports = getCurrent;
