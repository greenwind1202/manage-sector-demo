const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Sector = new Schema(
  {
    name: { type: String, required: true },
    sectors: { type: [Number], required: true },
    agreeToTerms: { type: Boolean, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('sectors', Sector);
