const bcrypt = require("bcrypt");

exports.hasPassword = async (password, res) => {
  try {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);

    return hash;
  } catch (e) {
    res.status(500).json({
      message: message.e,
    });
  }
};
