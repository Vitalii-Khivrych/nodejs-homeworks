const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const { User } = require("../../models");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  try {
    const smallAvatar = await Jimp.read(tempUpload);
    await smallAvatar.resize(250, 250).write(tempUpload);

    const extension = originalname.split(".").pop();
    const newAvatarName = `${_id}.${extension}`;
    const avatarPath = path.join(avatarDir, newAvatarName);
    await fs.rename(tempUpload, avatarPath);

    const avatarURL = path.join("avatars", avatarPath);
    await User.findOneAndUpdate(_id, { avatarURL });

    res.json({
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = updateAvatar;
