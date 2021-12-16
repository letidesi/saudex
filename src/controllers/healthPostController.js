const HealthPostSchema = require("../models/healthPostSchema");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

const findAllHealthPosts = async (req, res) => {
  try {
    const healthposts = await HealthPostSchema.find();
    res.status(200).json({
      message: "All health posts found:",
      healthposts,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

const searchAllHealthPostsByName = async (req, res) => {
  try {
    const name_found = await HealthPostSchema.find({
      health_post_name: new RegExp(req.query.health_post_name, "i"),
    });
    if (name_found.length === 0) {
      return res.status(404).json({
        message: "There are no health post with this name.",
      });
    }
    res.status(200).json({
      message: `All health posts under the name ${req.query.health_post_name}:`,
      name_found,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

const searchAllHealthPostsByMunicipality = async (req, res) => {
  try {
    const municipalityFound = await HealthPostSchema.find({
      municipality: new RegExp(req.query.municipality, "i"),
    });
    if (municipalityFound.length === 0) {
      return res.status(404).json({
        message: "There are no health posts in this municipality.",
      });
    }
    res.status(200).json({
      message: `All health posts in ${req.query.municipality}:`,
      municipalityFound,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

const registerHealthPost = async (req, res) => {
  try {
    const newHealthPost = new HealthPostSchema({
      _id: new mongoose.Types.ObjectId(),
      types_of_healthcare_facilities: req.body.types_of_healthcare_facilities,
      health_post_name: req.body.health_post_name,
      address: req.body.address,
      municipality: req.body.municipality,
      state: req.body.state,
      neighborhood: req.body.neighborhood,
      zip_code: req.body.zip_code,
      health_post_number: req.body.health_post_number,
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
      terms_of_use: req.body.terms_of_use,
    });
    if (newHealthPost.types_of_healthcare_facilities !== "POSTO DE SAÚDE") {
      return res.status(406).json({
        message:
          "To register health establishments it is mandatory to be a Health Post.",
        message_example:
          "Example of how to fill in the field: 'Posto de Saúde'",
      });
    }
    if (newHealthPost.state !== "RIO DE JANEIRO") {
      return res.status(406).json({
        message: "We can only register health post located in Rio de Janeiro.",
      });
    }
    if (!newHealthPost.health_post_name) {
      return res.status(406).json({
        message: "The name of the health post is required",
      });
    }
    if (!newHealthPost.address) {
      return res.status(406).json({
        message: "The address of the health post is required.",
      });
    }
    if (!newHealthPost.municipality) {
      return res.status(406).json({
        message: "The municipality of the health post is required.",
      });
    }
    if (!newHealthPost.state) {
      return res.status(406).json({
        message: "The state of the health post is required.",
      });
    }
    if (!newHealthPost.neighborhood) {
      return res.status(406).json({
        message: "The name of the neighborhood is required.",
      });
    }
    if (!newHealthPost.zip_code) {
      return res.status(406).json({
        message: "The zip code of the health post is required.",
      });
    }
    if (
      newHealthPost.zip_code.length < 9 ||
      newHealthPost.zip_code.length > 9
    ) {
      return res.status(406).json({
        message: "Error, the zip code must only have 9 numbers.",
        message_example: " xxxxx-xxx .",
      });
    }
    if (!newHealthPost.health_post_number) {
      return res.status(406).json({
        message: "The health post number is required..",
      });
    }
    if (newHealthPost.health_post_number.length > 4) {
      return res.status(406).json({
        message: "Error, the health post number must have up to 4 numbers.",
        message_examples: " x or xx or xxx or xxxx .",
      });
    }
    if (!newHealthPost.cnpj) {
      return res.status(406).json({
        message: "The CNPJ of the health post is required.",
      });
    }
    if (newHealthPost.cnpj.length < 18 || newHealthPost.cnpj.length > 18) {
      return res.status(406).json({
        message: "Error, the CNPJ must only have 18 numbers.",
        message_example: " xx.xxx.xxx/xxxx-xx .",
      });
    }
    if (!newHealthPost.telephone) {
      return res.status(406).json({
        message: "The telefone of the health post is required.",
      });
    }
    if (
      newHealthPost.telephone.length < 13 ||
      newHealthPost.telephone.length > 13
    ) {
      return res.status(406).json({
        message: "Error, the phone must only have 14 numbers.",
        message_example: " (xx)xxxx-xxxx .",
      });
    }
    if (!newHealthPost.email) {
      return res.status(406).json({
        message: "The e-mail of the health post is required.",
      });
    }
    if (!newHealthPost.days_open) {
      return res.status(406).json({
        message: "The days when the health post is open is required.",
      });
    }
    if (!newHealthPost.hours_of_operation) {
      return res.status(406).json({
        message: "The hours of operation of the health post is required.",
      });
    }
    if (newHealthPost.has_endocrinologist_doctors == undefined) {
      return res.status(406).json({
        message:
          "Please let us know whether or not you have any endocrinologists available.",
        message_example: "Please enter 'true' for yes or 'false' for no.",
      });
    }
    if (
      newHealthPost.how_many_tickets_are_available_to_make_an_appointment_with_an_endocrinologist <
      0
    ) {
      return res.status(406).json({
        message:
          "The number of tickets for diabetic people must be greater than or equal to zero in order for us to register your health post.",
      });
    }
    if (
      newHealthPost.how_many_tickets_are_available_to_make_an_appointment_with_an_endocrinologist ==
      null
    ) {
      return res.status(406).json({
        message: "Please inform us of the number of passwords for attendance.",
      });
    }
    if (
      newHealthPost.has_endocrinologist_doctors == false &&
      newHealthPost.how_many_tickets_are_available_to_make_an_appointment_with_an_endocrinologist >
        0
    ) {
      return res.status(406).json({
        message:
          "Error, without a doctor, you won't have a ticket for diabetic people.",
      });
    } else if (
      newHealthPost.has_endocrinologist_doctors == true &&
      newHealthPost.how_many_tickets_are_available_to_make_an_appointment_with_an_endocrinologist ==
        0
    ) {
      return res.status(406).json({
        message:
          "Error, if you have a doctor available, you will have a ticket for diabetic people.",
      });
    }
    if (
      newHealthPost.availability_of_supplies_for_diabetic_people == false &&
      newHealthPost.how_many_supplies_are_available_for_diabetics > 0
    ) {
      return res.status(406).json({
        message:
          "Error, if you don't have supplies available, you won't have a quantity of supplies for diabetic people.",
      });
    }
    if (
      newHealthPost.availability_of_supplies_for_diabetic_people == true &&
      newHealthPost.how_many_supplies_are_available_for_diabetics == 0
    ) {
      return res.status(406).json({
        message:
          "Error, if you have inputs available, you will have greater than zero quantity of inputs for diabetic people..",
      });
    }
    if (
      newHealthPost.availability_of_supplies_for_diabetic_people == undefined
    ) {
      return res.status(406).json({
        message:
          "Please let me know if you have any supplies available for diabetic people.",
        message_example: "Please enter 'true' for yes or 'false' for no.",
      });
    }
    if (newHealthPost.how_many_supplies_are_available_for_diabetics == null) {
      return res.status(406).json({
        message:
          "Please tell us how many supplies are available for diabetic people.",
        message_example:
          "If you do not have any diabetic supplies available, please enter '0'.",
      });
    }
    if (newHealthPost.how_many_supplies_are_available_for_diabetics < 0) {
      return res.status(406).json({
        message:
          "The amount of inputs for diabetic people must be greater than or equal to zero for us to register your health post.",
      });
    }
    if (!newHealthPost.terms_of_use) {
      return res.status(406).json({
        message:
          "Sorry, unfortunately when you inform us that you do not accept our terms of use, we will not be able to register your health post.",
      });
    }
    const { cnpj } = req.body;
    const healthPostExist = await HealthPostSchema.findOne({
      cnpj,
    });
    if (healthPostExist) {
      return res.status(406).json({
        message:
          "This health post has already been registered. Sorry, to preserve the security of our api, it will not be possible to register the same CNPJ.",
      });
    }
    const { email } = req.body;
    const healthPost_Exist = await HealthPostSchema.findOne({
      email,
    });
    if (healthPost_Exist) {
      return res.status(406).json({
        message:
          "Sorry, this e-mail has already been registered. Please use a new email address to register your health post.",
      });
    }
    const savedHealthpost = await newHealthPost.save();
    res.status(200).json({
      message: `${newHealthPost.types_of_healthcare_facilities}: ${newHealthPost.health_post_name}, was registered successfully!`,
      savedHealthpost,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

const searchHealthPostById = async (req, res) => {
  try {
    const healthPostFound = await HealthPostSchema.findById(req.params.id);
    if (healthPostFound) {
      res.status(200).json({
        message: `The ${healthPostFound.health_post_name} health post was found:`,
        healthPostFound,
      });
    }
  } catch (e) {
    res.status(500).json({
      message: `This health post could not be found. Please check if the id exists or try again later! ${e.message}`,
    });
  }
};

const updateHealthPostById = async (req, res) => {
  try {
    const healthPostFound = await HealthPostSchema.findById(req.params.id);
    if (healthPostFound) {
      healthPostFound.health_post_name =
        req.body.health_post_name || healthPostFound.health_post_name;
      healthPostFound.address = req.body.address || healthPostFound.address;
      healthPostFound.neighborhood =
        req.body.neighborhood || healthPostFound.neighborhood;
      healthPostFound.municipality =
        req.body.municipality || healthPostFound.municipality;
      healthPostFound.zip_code = req.body.zip_code || healthPostFound.zip_code;
      healthPostFound.health_post_number =
        req.body.health_post_number || healthPostFound.health_post_number;
      healthPostFound.cnpj = req.body.cnpj || healthPostFound.cnpj;
      healthPostFound.email = req.body.email || healthPostFound.email;
      healthPostFound.telephone =
        req.body.telephone || healthPostFound.telephone;
      healthPostFound.days_open =
        req.body.days_open || healthPostFound.days_open;
      healthPostFound.hours_of_operation =
        req.body.hours_of_operation || healthPostFound.hours_of_operation;
    }
    if (
      healthPostFound.zip_code.length < 9 ||
      healthPostFound.zip_code.length > 9
    ) {
      return res.status(406).json({
        message: "Error, the zip code must only have 9 numbers.",
        message_example: " xxxxx-xxx .",
      });
    }
    if (healthPostFound.health_post_number.length > 4) {
      return res.status(406).json({
        message: "Error, the health center number must have up to 4 numbers.",
        message_examples: " x or xx or xxx or xxxx .",
      });
    }
    if (healthPostFound.cnpj.length < 18 || healthPostFound.cnpj.length > 18) {
      return res.status(406).json({
        message: "Error, the CNPJ must only have 18 numbers.",
        message_example: " xx.xxx.xxx/xxxx-xx .",
      });
    }
    if (
      healthPostFound.telephone.length < 13 ||
      healthPostFound.telephone.length > 13
    ) {
      return res.status(406).json({
        message: "Error, the phone must only have 14 numbers.",
        message_example: " (xx)xxxx-xxxx .",
      });
    }
    if (req.body.has_endocrinologist_doctors == false) {
      healthPostFound.has_endocrinologist_doctors =
        req.body.has_endocrinologist_doctors;
    }
    if (req.body.has_endocrinologist_doctors == true) {
      healthPostFound.has_endocrinologist_doctors =
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
      healthPostFound.how_many_tickets_are_available_to_make_an_appointment_with_an_endocrinologist =
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
      healthPostFound.how_many_tickets_are_available_to_make_an_appointment_with_an_endocrinologist =
        req.body.how_many_tickets_are_available_to_make_an_appointment_with_an_endocrinologist;
    }
    if (req.body.availability_of_supplies_for_diabetic_people == false) {
      healthPostFound.availability_of_supplies_for_diabetic_people =
        req.body.availability_of_supplies_for_diabetic_people;
    }
    if (req.body.availability_of_supplies_for_diabetic_people == true) {
      healthPostFound.availability_of_supplies_for_diabetic_people =
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
      healthPostFound.how_many_supplies_are_available_for_diabetics =
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
      healthPostFound.how_many_supplies_are_available_for_diabetics =
        req.body.how_many_supplies_are_available_for_diabetics;
    }
    const { cnpj } = req.body;
    const healthPostExist = await HealthPostSchema.findOne({
      cnpj,
    });
    if (healthPostExist) {
      return res.status(406).json({
        message:
          "Sorry, this CNPJ already exists. Please enter a new CNPJ to update your health post or leave the field empty to continue with the same CNPJ.",
      });
    }
    const { email } = req.body;
    const healthPost_Exist = await HealthPostSchema.findOne({
      email,
    });
    if (healthPost_Exist) {
      return res.status(406).json({
        message:
          "Sorry, this e-mail already exists. Please enter a new e-mail to update your health post or leave the field empty to continue with the same e-mail.",
      });
    }
    const savedhealthPost = await healthPostFound.save();
    res.status(200).json({
      message: `The ${savedhealthPost.health_post_name} health post has been successfully updated!`,
    });
  } catch (e) {
    res.status(500).json({
      message:
        "This health post could not be found. Please check if the id exists or try again later! " +
        e.message,
    });
  }
};

const deleteHealthPostById = async (req, res) => {
  try {
    const id_healthpost = req.params.id;
    const healthPostFound = await HealthPostSchema.findOne({
      _id: id_healthpost,
    });
    if (!healthPostFound) {
      return res.status(404).json({
        message: `This health post could not be found. Please check if the id exists.`,
      });
    } else {
      HealthPostSchema.deleteOne({ _id: id_healthpost }, function (err) {
        if (!err) {
          return res.status(200).send({
            message: `The ${healthPostFound.health_post_name} health post was successfully deleted.`,
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
  findAllHealthPosts,
  searchAllHealthPostsByName,
  searchAllHealthPostsByMunicipality,
  registerHealthPost,
  searchHealthPostById,
  updateHealthPostById,
  deleteHealthPostById,
};
