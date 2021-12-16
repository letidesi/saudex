const AdmSchema = require("../models/admSchema");
const mongoose = require("mongoose");
const { hashPassword, hasPassword } = require("../helpers/auth");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

const message_one = async (req, res) => {
  res.status(200).json({
    message_main: "API SAUDEX",
    message: "É um prazer ter você aqui! :)",
  });
};

const findAllAdm = async (req, res) => {
  try {
    const admFound = await AdmSchema.find();
    res.status(200).json({
      message: "All administrators found:",
      admFound,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

const createAdm = async (req, res) => {
  try {
    const { username, email, password, confirmpassword, terms_of_use } =
      req.body;

    if (!username) {
      return res.status(406).json({
        message: "The username is required.",
      });
    }
    if (!email) {
      return res.status(406).json({
        message: "E-mail is required.",
      });
    }
    if (!password) {
      return res.status(406).json({
        message: "The password is required.",
      });
    }
    if (password !== confirmpassword) {
      return res.status(406).json({
        message: "The passwords do not match, the password should be the same.",
      });
    }
    const adminExist = await AdmSchema.findOne({ email: email });
    if (adminExist) {
      return res.status(406).json({
        message:
          "This e-mail has already been registered, please use another e-mail.",
      });
    }

    const newAdmin = new AdmSchema({
      _id: new mongoose.Types.ObjectId(),
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      terms_of_use: req.body.terms_of_use,
    });

    const passwordHashed = await hasPassword(newAdmin.password, res);
    newAdmin.password = passwordHashed;

    if (!terms_of_use) {
      return res.status(406).json({
        message:
          "Sorry, unfortunately if you inform us that you do not accept our terms of use, we will not be able to complete your registration.",
      });
    }

    const savedAdmin = await newAdmin.save();
    res.status(200).json({
      message: "Administrator successfully registered! (:",
      savedAdmin,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

const loginAdm = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(406).json({
        message: "E-mail is required.",
      });
    }
    if (!password) {
      return res.status(406).json({
        message: "The password is required.",
      });
    }
    const admin = await AdmSchema.findOne({ email: email });
    if (!admin) {
      return res.status(404).json({
        message: "This administrator does not exist, please register!",
      });
    }
    const passwordCheck = await bcrypt.compare(password, admin.password);
    if (!passwordCheck) {
      return res.status(406).json({
        message: "Please enter a valid password!",
      });
    }
    const token = jwt.sign(
      {
        id: admin._id,
      },
      secret
    );
    res.status(200).json({
      message: "Authentication successful!",
      token,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

const searchAdminById = async (req, res) => {
  try {
    const id = req.params.id;
    const admin = await AdmSchema.findById(id, "-password");
    if (admin) {
      res.status(200).json({
        message: "Administrator found:",
        admin,
      });
    }
  } catch (e) {
    res.status(500).json({
      message:
        "Error, this administrator does not exist, please register or try again later!" +
        e.message,
    });
  }
};

const updateAdmById = async (req, res) => {
  const { password } = req.body;
  try {
    const admFound = await AdmSchema.findById(req.params.id);
    if (admFound) {
      admFound.username = req.body.username || admFound.username;
      admFound.email = req.body.email || admFound.email;
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);
      admFound.password = passwordHash || admFound.password;
    }
    const admSaved = await admFound.save();
    res.status(200).json({
      message: `admnistrator ${admSaved.username} successfully updated. `,
      admSaved,
    });
  } catch (e) {
    res.status(500).json({
      message:
        "Error, this administrator does not exist, please update or try again later!" +
        e.message,
    });
  }
};

const deleteAdmById = async (req, res) => {
  try {
    const id_adm = req.params.id;
    const admFound = await AdmSchema.findOne({
      _id: id_adm,
    });
    if (!admFound) {
      return res.status(404).json({
        message: `This administrator could not be found. Please check if the id exists.`,
      });
    } else {
      AdmSchema.deleteOne({ _id: id_adm }, function (err) {
        if (!err) {
          return res.status(200).send({
            message: `Administrator ${admFound.username} was successfully deleted!`,
          });
        }
      });
    }
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

module.exports = {
  message_one,
  findAllAdm,
  createAdm,
  loginAdm,
  searchAdminById,
  updateAdmById,
  deleteAdmById,
};
