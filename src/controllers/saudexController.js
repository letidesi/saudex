const HealthCenterSchema = require("../models/healthCenterSchema");
const HospitalSchema = require("../models/hospitalSchema");
const PharmacySchema = require("../models/pharmacySchema");
const mongoose = require("mongoose");

const searchByAllEndocrinologists = async (req, res) => {
  try {
    const findAllHealthCenters = await HealthCenterSchema.find({
      has_endocrinologist_doctors:
        req.query.has_endocrinologist_doctors == "True" ||
        req.query.has_endocrinologist_doctors == "true" ||
        req.query.has_endocrinologist_doctors == "TRUE",
    });

    const findAllHospitals = await HospitalSchema.find({
      has_endocrinologist_doctors:
        req.query.has_endocrinologist_doctors == "True" ||
        req.query.has_endocrinologist_doctors == "true" ||
        req.query.has_endocrinologist_doctors == "TRUE",
    });

    if (
      req.query.has_endocrinologist_doctors == "False" ||
      req.query.has_endocrinologist_doctors == "false" ||
      req.query.has_endocrinologist_doctors == "FALSE"
    ) {
      return res.status(404).json({
        message: "Error, method used only to find endocrinology doctors.",
      });
    }
    res.status(200).json({
      message_Hospital: "All Medical Centers that have endocrinologists:",
      findAllHealthCenters,
      findAllHospitals,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

const searchAllMedicalCentersThatHaveSupplies = async (req, res) => {
  try {
    const findAllHealthCenters = await HealthCenterSchema.find({
      availability_of_supplies_for_diabetic_people:
        req.query.availability_of_supplies_for_diabetic_people == "True" ||
        req.query.availability_of_supplies_for_diabetic_people == "true" ||
        req.query.availability_of_supplies_for_diabetic_people == "TRUE",
    });

    const findAllHospitals = await HospitalSchema.find({
      availability_of_supplies_for_diabetic_people:
        req.query.availability_of_supplies_for_diabetic_people == "True" ||
        req.query.availability_of_supplies_for_diabetic_people == "true" ||
        req.query.availability_of_supplies_for_diabetic_people == "TRUE",
    });

    if (
      req.query.availability_of_supplies_for_diabetic_people == "False" ||
      req.query.availability_of_supplies_for_diabetic_people == "false" ||
      req.query.availability_of_supplies_for_diabetic_people == "FALSE"
    ) {
      return res.status(404).json({
        message:
          "Error, a method used only to find supplies available for diabetic people.",
      });
    }
    res.status(200).json({
      message_Hospital:
        "All Medical Centers that have supplies available for diabetic people:",
      findAllHealthCenters,
      findAllHospitals,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};



const searchForQuantityOfDiabetesSuppliesAtTheHospital = async (req, res) => {
  try {
    const quantityOfSupplies = await HospitalSchema.find({
      how_many_supplies_are_available_for_diabetics: req.query.how_many_supplies_are_available_for_diabetics
    })
 
    if (quantityOfSupplies.length === 0) {
      return res.status(404).json({
        message:
          "Sorry, we have no supplies available at this value, please check if we have higher values.",
      });
    }
    if (
      req.query.how_many_supplies_are_available_for_diabetics > 0
    ) {
      return res.status(200).json({
        message: `Quantity of diabetes supplies found:`,
        quantityOfSupplies,
      });
    } else {
      return res.status(404).json({
        message:
          "It is only possible to show the quantities of inputs available. Please enter the amount you would like to be verified.",
      });
    }
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};


const searchForQuantityOfDiabetesSuppliesAtTheHealthCenter = async (req, res) => {
  try {
    const quantityOfSupplies = await HealthCenterSchema.find({
      how_many_supplies_are_available_for_diabetics: req.query.how_many_supplies_are_available_for_diabetics
    })
 
    if (quantityOfSupplies.length === 0) {
      return res.status(404).json({
        message:
          "Sorry, we have no supplies available at this value, please check if we have higher values.",
      });
    }
    if (
      req.query.how_many_supplies_are_available_for_diabetics > 0
    ) {
      return res.status(200).json({
        message: `Quantity of diabetes supplies found:`,
        quantityOfSupplies,
      });
    } else {
      return res.status(404).json({
        message:
          "It is only possible to show the quantities of inputs available. Please enter the amount you would like to be verified.",
      });
    }
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};



const searchForHealthCentersByNumberOfServiceTickets = async (req, res) => {
  try {
    const many_found = await HealthCenterSchema.find({
      how_many_tickets_are_available_to_make_an_appointment_with_an_endocrinologist:
        req.query
          .how_many_tickets_are_available_to_make_an_appointment_with_an_endocrinologist,
    });
    if (many_found.length === 0) {
      return res.status(404).json({
        message:
          "Sorry, we have no passwords available with this value, please check if we have larger values.",
      });
    }
    if (
      req.query
        .how_many_tickets_are_available_to_make_an_appointment_with_an_endocrinologist >
      0
    ) {
      return res.status(200).json({
        message: `Passwords were found for attendance:`,
        many_found,
      });
    } else {
      return res.status(404).json({
        message:
          "You can only show available passwords. Please enter the quantity you would like to be verified.",
      });
    }
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};


const searchForHospitalsByNumberOfServiceTickets = async (req, res) => {
  try {
    const many_found = await HospitalSchema.find({
      how_many_tickets_are_available_to_make_an_appointment_with_an_endocrinologist:
        req.query
          .how_many_tickets_are_available_to_make_an_appointment_with_an_endocrinologist,
    });
    if (many_found.length === 0) {
      return res.status(404).json({
        message:
          "Sorry, we have no passwords available with this value, please check if we have larger values.",
      });
    }
    if (
      req.query
        .how_many_tickets_are_available_to_make_an_appointment_with_an_endocrinologist >
      0
    ) {
      return res.status(200).json({
        message: `Passwords were found for attendance:`,
        many_found,
      });
    } else {
      return res.status(404).json({
        message:
          "You can only show available passwords. Please enter the quantity you would like to be verified.",
      });
    }
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

const findAllPharmacies = async (req, res) => {
  try {
    const pharmacy = await PharmacySchema.find();
    res.status(200).json({
      message: "All accredited Pharmacies in the 'Popular Pharmacy Program':",
      pharmacy,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

module.exports = {
  searchByAllEndocrinologists,
  searchAllMedicalCentersThatHaveSupplies, 
  searchForQuantityOfDiabetesSuppliesAtTheHealthCenter,
  searchForQuantityOfDiabetesSuppliesAtTheHospital,
  searchForHealthCentersByNumberOfServiceTickets,
  searchForHospitalsByNumberOfServiceTickets,
  searchAllHealthCentersByName,
  searchAllHospitalsByName,
  searchAllPharmaciesByName,
  searchAllHealthCentersByMunicipality,
  searchAllHospitalsByMunicipality,
  searchPharmaciesByMunicipality,
  findAllPharmacies
};
