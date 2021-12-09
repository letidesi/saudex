const mongoose = require("mongoose");

const healthPostSchema = new mongoose.Schema(
  {
    id: mongoose.Schema.Types.ObjectId,

    types_of_healthcare_facilities: {
      type: String,
      uppercase: true,
      required: true,
    },
    health_post_name: {
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
    neighborhood: {
      type: String,
      required: true,
    },
    zip_code: {
      type: String,
      required: true,
    },
    health_post_number: {
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
    how_many_tickets_are_available_to_make_an_appointment_with_an_endocrinologist:
      {
        type: Number,
        required: true,
      },
    availability_of_supplies_for_diabetic_people: {
      type: Boolean,
      required: true,
    },
    how_many_supplies_are_available_for_diabetics: {
      type: Number,
      required: true,
    },
    terms_of_use: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("posto_de_saude", healthPostSchema);
