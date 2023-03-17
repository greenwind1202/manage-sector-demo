const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MasterSector = new Schema(
  {
    id: { type: Number },
    name: { type: String },
    level: { type: Number },
    parent: { type: Number },
  },
  { collection: 'master_sector' }
);

module.exports = mongoose.model('master_sector', MasterSector);
