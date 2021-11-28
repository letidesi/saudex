const HospitalSchema = require("../models/hospitalSchema");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

const findAllHospitals = async (req, res) => {
  try {
    const hospital = await HospitalSchema.find();
    res.status(200).json({
      message: "All hospitals found:",
      hospital,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

const searchAllHospitalsByName = async (req, res) => {
  try {
    const name_found = await HospitalSchema.find({
      hospital_name: new RegExp(req.query.hospital_name, "i"),
    });
    if (name_found.length === 0) {
      return res.status(404).json({
        message: "There are no hospitals with this name.",
      });
    }
    res.status(200).json({
      message: `All hospitals under the name ${req.query.hospital_name}:`,
      name_found,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

const searchAllHospitalsByMunicipality = async (req, res) => {
  try {
    const municipalityFound = await HospitalSchema.find({
      municipality: new RegExp(req.query.municipality, "i"),
    });
    if (municipalityFound.length === 0) {
      return res.status(404).json({
        message: "There are no hospitals in this municipality.",
      });
    }
    res.status(200).json({
      message: `All hospitals in ${req.query.municipality}:`,
      municipalityFound,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

const registeringHospitals = async (req, res) => {
  try {
    const newHospital = new HospitalSchema({
      _id: new mongoose.Types.ObjectId(),
      types_of_healthcare_facilities: req.body.types_of_healthcare_facilities,
      hospital_name: req.body.hospital_name,
      address: req.body.address,
      municipality: req.body.municipality,
      state: req.body.state,
      zip_code: req.body.zip_code,
      hospital_number: req.body.hospital_number,
      cnpj: req.body.cnpj,
      email: req.body.email,
      telephone: req.body.telephone,
      days_open: req.body.days_open,
      hours_of_operation: req.body.hours_of_operation,
      has_endocrinologist_doctors: req.body.has_endocrinologist_doctors,
      how_many_tickets_are_available_to_make_an_appointment_with_an_endocrinologist:
        req.body
          .how_many_tickets_are_available_to_make_an_appointment_with_an_endocrinologist,
      availability_of_supplies_for_diabetic_people:
        req.body.availability_of_supplies_for_diabetic_people,
      how_many_supplies_are_available_for_diabetics:
        req.body.how_many_supplies_are_available_for_diabetics,
    });
    if (newHospital.types_of_healthcare_facilities !== "HOSPITAL") {
      return res.status(406).json({
        message:
          "To register health establishments it is mandatory to be a Hospital.",
      });
    }
    if (newHospital.state !== "RIO DE JANEIRO") {
      return res.status(406).json({
        message: "We can only register hospital located in Rio de Janeiro.",
      });
    }
    if (!newHospital.hospital_name) {
      return res.status(406).json({
        message: "The name of the hospital is required.",
      });
    }
    if (!newHospital.address) {
      return res.status(406).json({
        message: "The address of the hospital is is required.",
      });
    }
    if (!newHospital.municipality) {
      return res.status(406).json({
        message: "The municipality of the hospital is required.",
      });
    }
    if (!newHospital.state) {
      return res.status(406).json({
        message: "The state of the hospital is required.",
      });
    }
    if (!newHospital.zip_code) {
      return res.status(406).json({
        message: "The zip code of the hospital is required.",
      });
    }
    if (newHospital.zip_code.length < 9 || newHospital.zip_code.length > 9) {
      return res.status(406).json({
        message: "Error, the zip code must only have 9 numbers.",
        message_example: " xxxxx-xxx .",
      });
    }
    if (!newHospital.hospital_number) {
      return res.status(406).json({
        message: "The hospital number is required.",
      });
    }
    if (newHospital.hospital_number.length > 4) {
      return res.status(406).json({
        message: "Error, the hospital number must have up to 4 numbers.",
        message_examples: " x or xx or xxx or xxxx .",
      });
    }
    if (!newHospital.cnpj) {
      return res.status(406).json({
        message: "The CNPJ of the hospital is required.",
      });
    }
    if (newHospital.cnpj.length < 18 || newHospital.cnpj.length > 18) {
      return res.status(406).json({
        message: "Error, the CNPJ must only have 18 numbers.",
        message_example: " xx.xxx.xxx/xxxx-xx .",
      });
    }
    if (!newHospital.email) {
      return res.status(406).json({
        message: "The e-mail of the hospital is required.",
      });
    }
    if (!newHospital.telephone) {
      return res.status(406).json({
        message: "The telephone number of the hospital is required.",
      });
    }
    if (
      newHospital.telephone.length < 13 ||
      newHospital.telephone.length > 13
    ) {
      return res.status(406).json({
        message: "Error, the phone must only have 14 numbers.",
        message_example: " (xx)xxxx-xxxx .",
      });
    }
    if (!newHospital.days_open) {
      return res.status(406).json({
        message: "The days when the hospital is open is required.",
      });
    }
    if (!newHospital.hours_of_operation) {
      return res.status(406).json({
        message: "The hours of operation of the hospital is required.",
      });
    }
    if (newHospital.has_endocrinologist_doctors == undefined) {
      return res.status(406).json({
        message:
          "Please let us know whether or not you have any endocrinologists available.",
        message_example: "Please enter 'true' for yes or 'false' for no.",
      });
    }
    if (
      newHospital.how_many_tickets_are_available_to_make_an_appointment_with_an_endocrinologist <
      0
    ) {
      return res.status(406).json({
        message:
          "The number of tickets for diabetic people must be greater than or equal to zero in order for us to register your health center.",
      });
    }
    if (
      newHospital.how_many_tickets_are_available_to_make_an_appointment_with_an_endocrinologist ==
      null
    ) {
      return res.status(406).json({
        message: "Please inform us of the number of passwords for attendance.",
      });
    }
    if (
      newHospital.has_endocrinologist_doctors == false &&
      newHospital.how_many_tickets_are_available_to_make_an_appointment_with_an_endocrinologist >
        0
    ) {
      return res.status(406).json({
        message:
          "Error, without a doctor, you won't have a ticket for diabetic people.",
      });
    } else if (
      newHospital.has_endocrinologist_doctors == true &&
      newHospital.how_many_tickets_are_available_to_make_an_appointment_with_an_endocrinologist ==
        0
    ) {
      return res.status(406).json({
        message:
          "Error, if you have a doctor available, you will have a ticket for diabetic people.",
      });
    }
    if (
      newHospital.availability_of_supplies_for_diabetic_people == false &&
      newHospital.how_many_supplies_are_available_for_diabetics > 0
    ) {
      return res.status(406).json({
        message:
          "Error, if you don't have supplies available, you won't have a quantity of supplies for diabetic people.",
      });
    }
    if (
      newHospital.availability_of_supplies_for_diabetic_people == true &&
      newHospital.how_many_supplies_are_available_for_diabetics == 0
    ) {
      return res.status(406).json({
        message:
          "Error, if you have inputs available, you will have greater than zero quantity of inputs for diabetic people..",
      });
    }
    if (newHospital.availability_of_supplies_for_diabetic_people == undefined) {
      return res.status(406).json({
        message:
          "Please let me know if you have any supplies available for diabetic people.",
        message_example: "Please enter 'true' for yes or 'false' for no.",
      });
    }
    if (newHospital.how_many_supplies_are_available_for_diabetics == null) {
      return res.status(406).json({
        message:
          "Please tell us how many supplies are available for diabetic people.",
        message_example:
          "If you do not have any diabetic supplies available, please enter '0'.",
      });
    }
    if (newHospital.how_many_supplies_are_available_for_diabetics < 0) {
      return res.status(406).json({
        message:
          "The amount of inputs for diabetic people must be greater than or equal to zero for us to register your health center.",
      });
    }
    const { cnpj } = req.body;
    const healthCenterExist = await HospitalSchema.findOne({
      cnpj,
    });
    if (healthCenterExist) {
      return res.status(406).json({
        message:
          "This hospital has already been registered. Sorry, to preserve the security of our api, it will not be possible to register the same CNPJ.",
      });
    }
    const { email } = req.body;
    const healthCenter_Exist = await HospitalSchema.findOne({
      email,
    });
    if (healthCenter_Exist) {
      return res.status(406).json({
        message:
          "Sorry, this e-mail has already been registered. Please use a new email address to register your health center.",
      });
    }
    const savedHospital = await newHospital.save();
    res.status(200).json({
      message: `${newHospital.types_of_healthcare_facilities}: ${newHospital.hospital_name}, was registered successfully!`,
      savedHospital,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

const searchHospitalById = async (req, res) => {
  try {
    const hospitalFound = await HospitalSchema.findById(req.params.id);
    if (hospitalFound) {
      res.status(200).json(hospitalFound);
    }
  } catch (e) {
    res.status(500).json({
      message: `This hospital could not be found. Please check if the id exists or try again later! ${e.message}`,
    });
  }
};

const updateHospitalById = async (req, res) => {
  try {
    const hospitalFound = await HospitalSchema.findById(req.params.id);
    if (hospitalFound) {
      hospitalFound.hospital_name =
        req.body.hospital_name || hospitalFound.hospital_name;
      hospitalFound.address = req.body.address || hospitalFound.address;
      hospitalFound.municipality =
        req.body.municipality || hospitalFound.municipality;
      hospitalFound.zip_code = req.body.zip_code || hospitalFound.zip_code;
      hospitalFound.hospital_number =
        req.body.hospital_number || hospitalFound.hospital_number;
      hospitalFound.cnpj = req.body.cnpj || hospitalFound.cnpj;
      hospitalFound.email = req.body.email || hospitalFound.email;
      hospitalFound.telephone = req.body.telephone || hospitalFound.telephone;
      hospitalFound.days_open = req.body.days_open || hospitalFound.days_open;
      hospitalFound.hours_of_operation =
        req.body.hours_of_operation || hospitalFound.hours_of_operation;
    }
    if (
      hospitalFound.zip_code.length < 9 ||
      hospitalFound.zip_code.length > 9
    ) {
      return res.status(406).json({
        message: "Error, the zip code must only have 9 numbers.",
        message_example: " xxxxx-xxx .",
      });
    }
    if (hospitalFound.hospital_number.length > 4) {
      return res.status(406).json({
        message: "Error, the hospital number must have up to 4 numbers.",
        message_examples: " x or xx or xxx or xxxx .",
      });
    }
    if (hospitalFound.cnpj.length < 18 || hospitalFound.cnpj.length > 18) {
      return res.status(406).json({
        message: "Error, the CNPJ must only have 18 numbers.",
        message_example: " xx.xxx.xxx/xxxx-xx .",
      });
    }
    if (
      hospitalFound.telephone.length < 13 ||
      hospitalFound.telephone.length > 13
    ) {
      return res.status(406).json({
        message: "Error, the phone must only have 14 numbers.",
        message_example: " (xx)xxxx-xxxx .",
      });
    }
    if (req.body.has_endocrinologist_doctors == false) {
      hospitalFound.has_endocrinologist_doctors =
        req.body.has_endocrinologist_doctors;
    }
    if (req.body.has_endocrinologist_doctors == true) {
      hospitalFound.has_endocrinologist_doctors =
        req.body.has_endocrinologist_doctors;
    }
    if (
      req.body.has_endocrinologist_doctors == false &&
      req.body
        .how_many_tickets_are_available_to_make_an_appointment_with_an_endocrinologist >
        0
    ) {
      return res.status(406).json({
        message:
          "Error, if you don't have doctors available, you won't have a ticket for service.",
      });
    } else if (
      req.body.has_endocrinologist_doctors == false &&
      req.body
        .how_many_tickets_are_available_to_make_an_appointment_with_an_endocrinologist <
        0
    ) {
      return res.status(406).json({
        message:
          "Error, if there are no doctors available for diabetic people, the quantity should be '0'.",
      });
    } else {
      hospitalFound.how_many_tickets_are_available_to_make_an_appointment_with_an_endocrinologist =
        req.body.how_many_tickets_are_available_to_make_an_appointment_with_an_endocrinologist;
    }
    if (
      req.body.has_endocrinologist_doctors == true &&
      req.body
        .how_many_tickets_are_available_to_make_an_appointment_with_an_endocrinologist ==
        0
    ) {
      return res.status(406).json({
        message:
          "Error, if you have doctors available, you will have tickets available for diabetic people.",
      });
    } else if (
      req.body.has_endocrinologist_doctors == true &&
      req.body
        .how_many_tickets_are_available_to_make_an_appointment_with_an_endocrinologist <
        0
    ) {
      return res.status(406).json({
        message:
          "Error, if you have doctors available, you will have tickets available for diabetic people.",
      });
    } else {
      hospitalFound.how_many_tickets_are_available_to_make_an_appointment_with_an_endocrinologist =
        req.body.how_many_tickets_are_available_to_make_an_appointment_with_an_endocrinologist;
    }
    if (req.body.availability_of_supplies_for_diabetic_people == false) {
      hospitalFound.availability_of_supplies_for_diabetic_people =
        req.body.availability_of_supplies_for_diabetic_people;
    }
    if (req.body.availability_of_supplies_for_diabetic_people == true) {
      hospitalFound.availability_of_supplies_for_diabetic_people =
        req.body.availability_of_supplies_for_diabetic_people;
    }
    if (
      req.body.availability_of_supplies_for_diabetic_people == false &&
      req.body.how_many_supplies_are_available_for_diabetics > 0
    ) {
      return res.status(406).json({
        message:
          "Error, if there are no supplies available for diabetic people, the quantity should be '0'.",
      });
    } else if (
      req.body.availability_of_supplies_for_diabetic_people == false &&
      req.body.how_many_supplies_are_available_for_diabetics < 0
    ) {
      return res.status(406).json({
        message:
          "Error, if there are no supplies available for diabetic people, the quantity should be '0'.",
      });
    } else {
      hospitalFound.how_many_supplies_are_available_for_diabetics =
        req.body.how_many_supplies_are_available_for_diabetics;
    }
    if (
      req.body.availability_of_supplies_for_diabetic_people == true &&
      req.body.how_many_supplies_are_available_for_diabetics == 0
    ) {
      return res.status(406).json({
        message:
          "Error, the amount of supplies available for diabetic people should be greater than zero.",
      });
    } else if (
      req.body.availability_of_supplies_for_diabetic_people == true &&
      req.body.how_many_supplies_are_available_for_diabetics < 0
    ) {
      return res.status(406).json({
        message:
          "Error, the amount of supplies available for diabetic people should be greater than zero.",
      });
    } else {
      hospitalFound.how_many_supplies_are_available_for_diabetics =
        req.body.how_many_supplies_are_available_for_diabetics;
    }
    const { cnpj } = req.body;
    const hospitalExist = await HospitalSchema.findOne({
      cnpj,
    });
    if (hospitalExist) {
      return res.status(406).json({
        message:
          "Sorry, this CNPJ already exists. Please enter a new CNPJ to update your hospital or leave the field empty to continue with the same CNPJ.",
      });
    }
    const { email } = req.body;
    const hospital_Exist = await HospitalSchema.findOne({
      email,
    });
    if (hospital_Exist) {
      return res.status(406).json({
        message:
          "Sorry, this email already exists. Please enter a new email address to update your hospital or leave the field empty to continue with the same email.",
      });
    }
    const savedHospital = await hospitalFound.save();
    res.status(200).json({
      message: `The ${savedHospital.hospital_name} hospital has been successfully updated!`,
    });
  } catch (e) {
    res.status(500).json({
      message: `This hospital could not be found. Please check if the id exists or try again later! ${e.message}`,
    });
  }
};

const deleteHospitalById = async (req, res) => {
  try {
    const id_hospital = req.params.id;
    const hospitalFound = await HospitalSchema.findOne({ _id: id_hospital });
    if (!hospitalFound) {
      return res.status(404).json({
        message: `This hospital could not be found. Please check if the id exists.`,
      });
    } else {
      HospitalSchema.deleteOne({ _id: id_hospital }, function (err) {
        if (!err) {
          return res.status(200).send({
            message: `The ${hospitalFound.hospital_name} hospital was successfully deleted.`,
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

function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "Access denied!",
    });
  }
  try {
    const secret = process.env.SECRET;
    jwt.verify(token, secret);
    next();
  } catch (e) {
    return res.status(500).json({
      message: "Please enter a valid token!",
    });
  }
}

module.exports = {
  findAllHospitals,
  searchAllHospitalsByName,
  searchAllHospitalsByMunicipality,
  registeringHospitals,
  searchHospitalById,
  updateHospitalById,
  deleteHospitalById,
  checkToken,
};
