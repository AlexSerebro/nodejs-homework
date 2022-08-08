const { Conflict } = require("http-errors");
const { User } = require("../../models");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const { sendEmail } = require("../../helpers");

const register = async (req, res) => {
  console.log(req.body);
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(` Email ${email} in use`);
  }
  const verificationToken = nanoid();
  const avatarURL = gravatar.url(email, { s: 250 });
  const mail = {
    to: email,
    subject: "Подтверждение email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Подтвердить емаил</a>`,
  };
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const result = await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
    verificationToken,
  });

  await sendEmail(mail);

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      user: {
        email,
        subscription: "starter",
        avatarURL,
        verificationToken,
      },
    },
  });
};

module.exports = register;
