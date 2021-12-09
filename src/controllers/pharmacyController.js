const PharmacySchema = require("../models/pharmacySchema");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

const findAllPharmacies = async (req, res) => {
  try {
    const pharmacy = await PharmacySchema.find();
    res.status(200).json({
      message: "All pharmacies found:",
      pharmacy,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

const searchAllPharmaciesByName = async (req, res) => {
  try {
    const pharmacy_found = await PharmacySchema.find({
      pharmacy_name: new RegExp(req.query.pharmacy_name, "i"),
    });
    if (pharmacy_found.length === 0) {
      return res.status(404).json({
        message: "There are no pharmacies with this name.",
      });
    }
    res.status(200).json({
      message: `All pharmacies under the name ${req.query.pharmacy_name}:`,
      pharmacy_found,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

const searchPharmaciesByMunicipality = async (req, res) => {
  try {
    const municipalityFound = await PharmacySchema.find({
      municipality: new RegExp(req.query.municipality, "i"),
    });
    if (municipalityFound.length === 0) {
      return res.status(404).json({
        message: "There are no pharmacies in this municipality.",
      });
    }
    res.status(200).json({
      message: `All pharmacies in ${req.query.municipality}:`,
      municipalityFound,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

const registeringPharmacies = async (req, res) => {
  try {
    const newPharmacy = new PharmacySchema({
      _id: new mongoose.Types.ObjectId(),
      types_of_healthcare_facilities: req.body.types_of_healthcare_facilities,
      pharmacy_name: req.body.pharmacy_name,
      address: req.body.address,
      municipality: req.body.municipality,
      state: req.body.state,
      neighborhood: req.body.neighborhood,
      zip_code: req.body.zip_code,
      pharmacy_number: req.body.pharmacy_number,
      cnpj: req.body.cnpj,
      email: req.body.email,
      telephone: req.body.telephone,
      days_open: req.body.days_open,
      hours_of_operation: req.body.hours_of_operation,
      accredited_in_the_popular_pharmacy_program:
        req.body.accredited_in_the_popular_pharmacy_program,
      terms_of_use: req.body.terms_of_use,
    });
    if (newPharmacy.types_of_healthcare_facilities !== "FARMÁCIA") {
      return res.status(406).json({
        message:
          "To register health establishments it is mandatory to be a Pharmacy.",
        message_example: "Example of how to fill in the field: 'Farmácia'",
      });
    }

    if (newPharmacy.state !== "RIO DE JANEIRO") {
      return res.status(406).json({
        message: "We can only register pharmacy located in Rio de Janeiro.",
      });
    }
    if (!newPharmacy.pharmacy_name) {
      return res.status(406).json({
        message: "The name of the pharmacy is required.",
      });
    }
    if (!newPharmacy.address) {
      return res.status(406).json({
        message: "The address of the pharmacy is required.",
      });
    }
    if (!newPharmacy.municipality) {
      return res.status(406).json({
        message: "The municipality of the pharmacy is required.",
      });
    }
    if (!newPharmacy.state) {
      return res.status(406).json({
        message: "The state of the pharmacy is required.",
      });
    }
    if (!newPharmacy.neighborhood) {
      return res.status(406).json({
        message: "The name of the neighborhood is required.",
      });
    }
    if (!newPharmacy.zip_code) {
      return res.status(406).json({
        message: "The zip code of the pharmacy is required.",
      });
    }

    if (newPharmacy.zip_code.length < 9 || newPharmacy.zip_code.length > 9) {
      return res.status(406).json({
        message: "Error, the zip code must only have 9 numbers.",
        message_example: " xxxxx-xxx .",
      });
    }
    if (!newPharmacy.pharmacy_number) {
      return res.status(406).json({
        message: "The pharmacy number is required..",
      });
    }
    if (newPharmacy.pharmacy_number.length > 4) {
      return res.status(406).json({
        message: "Error, the pharmacy number must have up to 4 numbers.",
        message_examples: " x or xx or xxx or xxxx .",
      });
    }
    if (!newPharmacy.cnpj) {
      return res.status(406).json({
        message: "The CNPJ of the pharmacy is required.",
      });
    }
    if (newPharmacy.cnpj.length < 18 || newPharmacy.cnpj.length > 18) {
      return res.status(406).json({
        message: "Error, the CNPJ must only have 18 numbers.",
        message_example: " xx.xxx.xxx/xxxx-xx .",
      });
    }
    if (!newPharmacy.telephone) {
      return res.status(406).json({
        message: "The telefone of the pharmacy is required.",
      });
    }
    if (
      newPharmacy.telephone.length < 13 ||
      newPharmacy.telephone.length > 13
    ) {
      return res.status(406).json({
        message: "Error, the phone must only have 14 numbers.",
        message_example: " (xx)xxxx-xxxx .",
      });
    }

    if (!newPharmacy.email) {
      return res.status(406).json({
        message: "The e-mail of the pharmacy is required.",
      });
    }
    if (!newPharmacy.days_open) {
      return res.status(406).json({
        message: "The days when the pharmacy is open is required.",
      });
    }
    if (!newPharmacy.hours_of_operation) {
      return res.status(406).json({
        message: "The hours of operation of the pharmacy is required.",
      });
    }
    if (newPharmacy.accredited_in_the_popular_pharmacy_program == false) {
      return res.status(406).json({
        message:
          "To register your pharmacy you need to be accredited in the 'Popular Pharmacy Program'. ",
      });
    }
    if (!newPharmacy.terms_of_use) {
      return res.status(406).json({
        message:
          "Sorry, unfortunately when you inform us that you do not accept our terms of use, we will not be able to register your health center.",
      });
    }
    const { cnpj } = req.body;
    const pharmacyExist = await PharmacySchema.findOne({
      cnpj,
    });
    if (pharmacyExist) {
      return res.status(406).json({
        message:
          "This pharmacy has already been registered. Sorry, to preserve the security of our api, it will not be possible to register the same CNPJ.",
      });
    }
    const { email } = req.body;
    const pharmacy_Exist = await PharmacySchema.findOne({
      email,
    });
    if (pharmacy_Exist) {
      return res.status(406).json({
        message:
          "Sorry, this e-mail has already been registered. Please use a new email address to register your health center.",
      });
    }
    const savedPharmacy = await newPharmacy.save();
    res.status(200).json({
      message: `${newPharmacy.types_of_healthcare_facilities}: ${newPharmacy.pharmacy_name}, was registered successfully!`,
      savedPharmacy,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

const searchPharmacyById = async (req, res) => {
  try {
    const pharmacyFound = await PharmacySchema.findById(req.params.id);
    if (pharmacyFound) {
      res.status(200).json({
        message: `The ${pharmacyFound.pharmacy_name} pharmacy was found:`,
        pharmacyFound,
      });
    }
  } catch (e) {
    res.status(500).json({
      message: `This pharmacy could not be found. Please check if the id exists or try again later! ${e.message}`,
    });
  }
};

const updatePharmacyById = async (req, res) => {
  try {
    const pharmacyFound = await PharmacySchema.findById(req.params.id);
    if (pharmacyFound) {
      pharmacyFound.pharmacy_name =
        req.body.pharmacy_name || pharmacyFound.pharmacy_name;
      pharmacyFound.address = req.body.address || pharmacyFound.address;
      pharmacyFound.municipality =
        req.body.municipality || pharmacyFound.municipality;
      pharmacyFound.zip_code = req.body.zip_code || pharmacyFound.zip_code;
      pharmacyFound.pharmacy_number =
        req.body.pharmacy_number || pharmacyFound.pharmacy_number;
      pharmacyFound.cnpj = req.body.cnpj || pharmacyFound.cnpj;
      pharmacyFound.email = req.body.email || pharmacyFound.email;
      pharmacyFound.telephone = req.body.telephone || pharmacyFound.telephone;
      pharmacyFound.days_open = req.body.days_open || pharmacyFound.days_open;
      pharmacyFound.hours_of_operation =
        req.body.hours_of_operation || pharmacyFound.hours_of_operation;
    }
    if (
      pharmacyFound.zip_code.length < 9 ||
      pharmacyFound.zip_code.length > 9
    ) {
      return res.status(406).json({
        message: "Error, the zip code must only have 9 numbers.",
        message_example: " xxxxx-xxx .",
      });
    }
    if (pharmacyFound.pharmacy_number.length > 4) {
      return res.status(406).json({
        message: "Error, the pharmacy number must have up to 4 numbers.",
        message_examples: " x or xx or xxx or xxxx .",
      });
    }
    if (pharmacyFound.cnpj.length < 18 || pharmacyFound.cnpj.length > 18) {
      return res.status(406).json({
        message: "Error, the CNPJ must only have 18 numbers.",
        message_example: " xx.xxx.xxx/xxxx-xx .",
      });
    }
    if (
      pharmacyFound.telephone.length < 13 ||
      pharmacyFound.telephone.length > 13
    ) {
      return res.status(406).json({
        message: "Error, the phone must only have 14 numbers.",
        message_example: " (xx)xxxx-xxxx .",
      });
    }
    const { cnpj } = req.body;
    const pharmacyExist = await PharmacySchema.findOne({
      cnpj,
    });
    if (pharmacyExist) {
      return res.status(406).json({
        message:
          "Sorry, this CNPJ already exists. Please enter a new CNPJ to update your pharmacy or leave the field empty to continue with the same CNPJ.",
      });
    }
    const { email } = req.body;
    const pharmacy_Exist = await PharmacySchema.findOne({
      email,
    });
    if (pharmacy_Exist) {
      return res.status(406).json({
        message:
          "Sorry, this email already exists. Please enter a new email address to update your pharmacy or leave the field empty to continue with the same email.",
      });
    }
    const savedPharmacy = await pharmacyFound.save();
    res.status(200).json({
      message: `The ${savedPharmacy.pharmacy_name} pharmacy has been successfully updated!`,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

const deletePharmacyById = async (req, res) => {
  try {
    const id_pharmacy = req.params.id;
    const pharmacyFound = await PharmacySchema.findOne({ _id: id_pharmacy });
    if (!pharmacyFound) {
      res.status(404).json({
        message: `This pharmacy could not be found. Please check if the id exists.`,
      });
    } else {
      PharmacySchema.deleteOne({ _id: id_pharmacy }, function (err) {
        if (!err) {
          res.status(200).json({
            message: `The ${pharmacyFound.pharmacy_name} pharmacy was successfully deleted.`,
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
  findAllPharmacies,
  searchAllPharmaciesByName,
  searchPharmaciesByMunicipality,
  registeringPharmacies,
  searchPharmacyById,
  updatePharmacyById,
  deletePharmacyById,
  checkToken,
};
