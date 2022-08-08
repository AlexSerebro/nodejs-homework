const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");

const avatarDir = path.join(__dirname, "../../", "public");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const imgName = `${id}${originalname}`;
  try {
    const resultUpload = path.join(avatarDir, imgName);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", imgName);
    await User.findByIdAndUpdate(req.user.id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = updateAvatar;
