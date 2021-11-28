const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema(
  {
    id: mongoose.Schema.Types.ObjectId,

    types_of_healthcare_facilities: {
      type: String,
      uppercase: true,
      required: true,
    },
    hospital_name: {
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
    hospital_number: {
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
    has_endocrinologist_doctors: {
      type: Boolean,
      required: true,
    },
    how_many_tickets_are_available_to_make_an_appointment_with_an_endocrinologist:{
      type: Number,
      required: true,
    },
    availability_of_supplies_for_diabetic_people: {
      type: Boolean,
      required: true

    },
    how_many_supplies_are_available_for_diabetics: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("hospital", hospitalSchema);
