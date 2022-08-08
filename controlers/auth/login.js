const { User } = require("../../models");
const { Unauthorized } = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const passCompare = bcrypt.compareSync(password, user.password);
  if (!user || !passCompare) {
    throw new Unauthorized("Email or password is wrong");
  }

  if (!user.verify) {
    throw new Unauthorized("Not Verify");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY);
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      token,
      user: {
        email,
        subscription: "starter",
      },
    },
  });
};

module.exports = login;
