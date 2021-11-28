const HealthCenterSchema = require("../models/healthCenterSchema");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

const findAllHealthCenters = async (req, res) => {
  try {
    const healthcenter = await HealthCenterSchema.find();
    res.status(200).json({
      message: "All health centers found:",
      healthcenter,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

const searchAllHealthCentersByName = async (req, res) => {
  try {
    const name_found = await HealthCenterSchema.find({
      healthcenter_name: new RegExp(req.query.healthcenter_name, "i"),
    });
    if (name_found.length === 0) {
      return res.status(404).json({
        message: "There are no health center with this name.",
      });
    }
    res.status(200).json({
      message: `All health centers under the name ${req.query.healthcenter_name}:`,
      name_found,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};



const searchAllHealthCentersByMunicipality = async (req, res) => {
  try {
    const municipalityFound = await HealthCenterSchema.find({
      municipality: new RegExp(req.query.municipality, "i"),
    });
    if (municipalityFound.length === 0) {
      return res.status(404).json({
        message: "There are no health centers in this municipality.",
      });
    }
    res.status(200).json({
      message: `All health centers in ${req.query.municipality}:`,
      municipalityFound,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};


const registerHealthCenter = async (req, res) => {
  try {
    const newHealthCenter = new HealthCenterSchema({
      _id: new mongoose.Types.ObjectId(),
      types_of_healthcare_facilities: req.body.types_of_healthcare_facilities,
      healthcenter_name: req.body.healthcenter_name,
      address: req.body.address,
      municipality: req.body.municipality,
      state: req.body.state,
      zip_code: req.body.zip_code,
      healthcenter_number: req.body.healthcenter_number,
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
    if (newHealthCenter.types_of_healthcare_facilities !== "POSTO DE SAÚDE") {
      return res.status(406).json({
        message:
          "To register health establishments it is mandatory to be a Health Center.",
        message_example:
          "Example of how to fill in the field: 'Posto de Saúde'",
      });
    }
    if (newHealthCenter.state !== "RIO DE JANEIRO") {
      return res.status(406).json({
        message:
          "We can only register health center located in Rio de Janeiro.",
      });
    }
    if (!newHealthCenter.healthcenter_name) {
      return res.status(406).json({
        message: "The name of the health center is required",
      });
    }
    if (!newHealthCenter.address) {
      return res.status(406).json({
        message: "The address of the health center is required.",
      });
    }
    if (!newHealthCenter.municipality) {
      return res.status(406).json({
        message: "The municipality of the health center is required.",
      });
    }
    if (!newHealthCenter.state) {
      return res.status(406).json({
        message: "The state of the health center is required.",
      });
    }
    if (!newHealthCenter.zip_code) {
      return res.status(406).json({
        message: "The zip code of the health center is required.",
      });
    }
    if (
      newHealthCenter.zip_code.length < 9 ||
      newHealthCenter.zip_code.length > 9
    ) {
      return res.status(406).json({
        message: "Error, the zip code must only have 9 numbers.",
        message_example: " xxxxx-xxx .",
      });
    }
    if (!newHealthCenter.healthcenter_number) {
      return res.status(406).json({
        message: "The health center number is required..",
      });
    }
    if (newHealthCenter.healthcenter_number.length > 4) {
      return res.status(406).json({
        message: "Error, the health center number must have up to 4 numbers.",
        message_examples: " x or xx or xxx or xxxx .",
      });
    }
    if (!newHealthCenter.cnpj) {
      return res.status(406).json({
        message: "The CNPJ of the health center is required.",
      });
    }
    if (newHealthCenter.cnpj.length < 18 || newHealthCenter.cnpj.length > 18) {
      return res.status(406).json({
        message: "Error, the CNPJ must only have 18 numbers.",
        message_example: " xx.xxx.xxx/xxxx-xx .",
      });
    }
    if (!newHealthCenter.telephone) {
      return res.status(406).json({
        message: "The telefone of the health center is required.",
      });
    }
    if (
      newHealthCenter.telephone.length < 13 ||
      newHealthCenter.telephone.length > 13
    ) {
      return res.status(406).json({
        message: "Error, the phone must only have 14 numbers.",
        message_example: " (xx)xxxx-xxxx .",
      });
    }
    if (!newHealthCenter.email) {
      return res.status(406).json({
        message: "The e-mail of the health center is required.",
      });
    }
    if (!newHealthCenter.days_open) {
      return res.status(406).json({
        message: "The days when the health center is open is required.",
      });
    }
    if (!newHealthCenter.hours_of_operation) {
      return res.status(406).json({
        message: "The hours of operation of the health center is required.",
      });
    }
    if (newHealthCenter.has_endocrinologist_doctors == undefined) {
      return res.status(406).json({
        message:
          "Please let us know whether or not you have any endocrinologists available.",
        message_example: "Please enter 'true' for yes or 'false' for no.",
      });
    }
    if (
      newHealthCenter.how_many_tickets_are_available_to_make_an_appointment_with_an_endocrinologist <
      0
    ) {
      return res.status(406).json({
        message:
          "The number of tickets for diabetic people must be greater than or equal to zero in order for us to register your health center.",
      });
    }
    if (
      newHealthCenter.how_many_tickets_are_available_to_make_an_appointment_with_an_endocrinologist ==
      null
    ) {
      return res.status(406).json({
        message: "Please inform us of the number of passwords for attendance.",
      });
    }
    if (
      newHealthCenter.has_endocrinologist_doctors == false &&
      newHealthCenter.how_many_tickets_are_available_to_make_an_appointment_with_an_endocrinologist >
        0
    ) {
     return res.status(406).json({
        message:
          "Error, without a doctor, you won't have a ticket for diabetic people.",
      });
    } else if (
      newHealthCenter.has_endocrinologist_doctors == true &&
      newHealthCenter.how_many_tickets_are_available_to_make_an_appointment_with_an_endocrinologist ==
        0
    ) {
     return res.status(406).json({
        message:
          "Error, if you have a doctor available, you will have a ticket for diabetic people.",
      });
    }
    if (
      newHealthCenter.availability_of_supplies_for_diabetic_people == false &&
      newHealthCenter.how_many_supplies_are_available_for_diabetics > 0
    ) {
     return res.status(406).json({
        message:
          "Error, if you don't have supplies available, you won't have a quantity of supplies for diabetic people.",
      });
    }
    if (
      newHealthCenter.availability_of_supplies_for_diabetic_people == true &&
      newHealthCenter.how_many_supplies_are_available_for_diabetics == 0
    ) {
      return res.status(406).json({
        message:
          "Error, if you have inputs available, you will have greater than zero quantity of inputs for diabetic people..",
      });
    }
    if (
      newHealthCenter.availability_of_supplies_for_diabetic_people == undefined
    ) {
      return res.status(406).json({
        message:
          "Please let me know if you have any supplies available for diabetic people.",
        message_example: "Please enter 'true' for yes or 'false' for no.",
      });
    }
    if (newHealthCenter.how_many_supplies_are_available_for_diabetics == null) {
      return res.status(406).json({
        message:
          "Please tell us how many supplies are available for diabetic people.",
        message_example:
          "If you do not have any diabetic supplies available, please enter '0'.",
      });
    }
    if (newHealthCenter.how_many_supplies_are_available_for_diabetics < 0) {
      return res.status(406).json({
        message:
          "The amount of inputs for diabetic people must be greater than or equal to zero for us to register your health center.",
      });
    }
    const { cnpj } = req.body;
    const healthCenterExist = await HealthCenterSchema.findOne({
      cnpj,
    });
    if (healthCenterExist) {
      return res.status(406).json({
        message:
          "This health center has already been registered. Sorry, to preserve the security of our api, it will not be possible to register the same CNPJ.",
      });
    }
    const { email } = req.body;
    const healthCenter_Exist = await HealthCenterSchema.findOne({
      email,
    });
    if (healthCenter_Exist) {
      return res.status(406).json({
        message:
          "Sorry, this e-mail has already been registered. Please use a new email address to register your health center.",
      });
    }
    const savedHealthCenter = await newHealthCenter.save();
    res.status(200).json({
      message: `${newHealthCenter.types_of_healthcare_facilities}: ${newHealthCenter.healthcenter_name}, was registered successfully!`,
      savedHealthCenter,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

const searchHealthCenterById = async (req, res) => {
  try {
    const healthCenterFound = await HealthCenterSchema.findById(req.params.id);
    if (healthCenterFound) {
      res.status(200).json({
        message: `The ${healthCenterFound.healthcenter_name} health center was found:`,
        healthCenterFound,
      });
    }
  } catch (e) {
    res.status(500).json({
      message: `This health center could not be found. Please check if the id exists or try again later! ${e.message}`,
    });
  }
};

const updateHealthCenterById = async (req, res) => {
  try {
    const healthCenterFound = await HealthCenterSchema.findById(req.params.id);
    if (healthCenterFound) {
      healthCenterFound.healthcenter_name =
        req.body.healthcenter_name || healthCenterFound.healthcenter_name;
      healthCenterFound.address = req.body.address || healthCenterFound.address;
      healthCenterFound.municipality =
        req.body.municipality || healthCenterFound.municipality;
      healthCenterFound.zip_code =
        req.body.zip_code || healthCenterFound.zip_code;
      healthCenterFound.healthcenter_number =
        req.body.healthcenter_number || healthCenterFound.healthcenter_number;
      healthCenterFound.cnpj = req.body.cnpj || healthCenterFound.cnpj;
      healthCenterFound.email = req.body.email || healthCenterFound.email;
      healthCenterFound.telephone =
        req.body.telephone || healthCenterFound.telephone;
      healthCenterFound.days_open =
        req.body.days_open || healthCenterFound.days_open;
      healthCenterFound.hours_of_operation =
        req.body.hours_of_operation || healthCenterFound.hours_of_operation;
    }
    if (
     healthCenterFound.zip_code.length < 9 ||
     healthCenterFound.zip_code.length > 9
    ) {
      return res.status(406).json({
        message: "Error, the zip code must only have 9 numbers.",
        message_example: " xxxxx-xxx .",
      });
    }
    if (healthCenterFound.healthcenter_number.length > 4) {
      return res.status(406).json({
        message: "Error, the health center number must have up to 4 numbers.",
        message_examples: " x or xx or xxx or xxxx .",
      });
    }
    if (
      healthCenterFound.cnpj.length < 18 ||
      healthCenterFound.cnpj.length > 18
    ) {
      return res.status(406).json({
        message: "Error, the CNPJ must only have 18 numbers.",
        message_example: " xx.xxx.xxx/xxxx-xx .",
      });
    }
    if (
      healthCenterFound.telephone.length < 13 ||
      healthCenterFound.telephone.length > 13
    ) {
      return res.status(406).json({
        message: "Error, the phone must only have 14 numbers.",
        message_example: " (xx)xxxx-xxxx .",
      });
    }
    if (req.body.has_endocrinologist_doctors == false) {
      healthCenterFound.has_endocrinologist_doctors =
        req.body.has_endocrinologist_doctors;
    }
    if (req.body.has_endocrinologist_doctors == true) {
      healthCenterFound.has_endocrinologist_doctors =
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
      healthCenterFound.how_many_tickets_are_available_to_make_an_appointment_with_an_endocrinologist =
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
      healthCenterFound.how_many_tickets_are_available_to_make_an_appointment_with_an_endocrinologist =
        req.body.how_many_tickets_are_available_to_make_an_appointment_with_an_endocrinologist;
    }
    if (req.body.availability_of_supplies_for_diabetic_people == false) {
      healthCenterFound.availability_of_supplies_for_diabetic_people =
        req.body.availability_of_supplies_for_diabetic_people;
    }
    if (req.body.availability_of_supplies_for_diabetic_people == true) {
      healthCenterFound.availability_of_supplies_for_diabetic_people =
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
      healthCenterFound.how_many_supplies_are_available_for_diabetics =
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
      healthCenterFound.how_many_supplies_are_available_for_diabetics =
        req.body.how_many_supplies_are_available_for_diabetics;
    }
    const { cnpj } = req.body;
    const healthCenterExist = await HealthCenterSchema.findOne({
      cnpj,
    });
    if (healthCenterExist) {
      return res.status(406).json({
        message:
          "Sorry, this CNPJ already exists. Please enter a new CNPJ to update your health center or leave the field empty to continue with the same CNPJ.",
      });
    }
    const { email } = req.body;
    const healthCenter_Exist = await HealthCenterSchema.findOne({
      email,
    });
    if (healthCenter_Exist) {
      return res.status(406).json({
        message:
          "Sorry, this e-mail already exists. Please enter a new e-mail to update your health center or leave the field empty to continue with the same e-mail.",
      });
    }
    const savedHealthCenter = await healthCenterFound.save();
    res.status(200).json({
      message: `The ${savedHealthCenter.healthcenter_name} health center has been successfully updated!`,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

const deleteHealthCenterById = async (req, res) => {
  try {
    const id_healthCenter = req.params.id;
    const healthCenterFound = await HealthCenterSchema.findOne({
      _id: id_healthCenter,
    });
    if (!healthCenterFound) {
      return res.status(404).json({
        message: `This health center could not be found. Please check if the id exists.`,
      });
    } else {
      HealthCenterSchema.deleteOne({ _id: id_healthCenter }, function (err) {
        if (!err) {
          return res.status(200).send({
            message: `The ${healthCenterFound.healthcenter_name} health center was successfully deleted.`,
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
  findAllHealthCenters,
  searchAllHealthCentersByName,
  searchAllHealthCentersByMunicipality,
  registerHealthCenter,
  searchHealthCenterById,
  updateHealthCenterById,
  deleteHealthCenterById,
  checkToken,
};
