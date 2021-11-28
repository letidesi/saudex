const mongoose = require("mongoose");

const pharmacySchema = new mongoose.Schema(
  {
    id: mongoose.Schema.Types.ObjectId,

    types_of_healthcare_facilities: {
      type: String,
      uppercase: true,
      required: true,
    },
    pharmacy_name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    municipality: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      uppercase: true,
      required: true,
    },
    zip_code: {
      type: String,
      required: true,
    },
    pharmacy_number: {
      type: String,
      required: true,
    },
    cnpj: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    telephone: {
      type: String,
      required: true,
    },
    days_open: {
      type: String,
      required: true,
    },
    hours_of_operation: {
      type: String,
      required: true,
    },
    accredited_in_the_popular_pharmacy_program: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("pharmacy", pharmacySchema);
