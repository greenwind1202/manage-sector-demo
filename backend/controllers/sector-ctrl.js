const Sector = require('../models/sector-model');
const MasterSector = require('../models/master-sector-model');
const db = require('../db');

createSector = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a valid Sector',
    });
  }

  const sector = new Sector(body);
  if (!sector) {
    return res.status(400).json({ success: false, error: err });
  }

  sector
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: sector._id,
        message: 'Sector created!',
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: 'Sector not created!',
      });
    });
};

updateSector = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update',
    });
  }
  await Sector.findOne({ _id: req.params.id })
    .then((sector) => {
      sector.name = body.name;
      sector.sectors = body.sectors;
      sector.agree_to_terms = body.agree_to_terms;
      sector.save();
      res.status(200).json({
        success: true,
        id: sector._id,
        message: 'Sector updated!',
      });
    })
    .catch((err) => {
      res.status(404).json({
        err,
        message: 'Sector not found!',
      });
      console.log(err);
    });
};

getSectors = async (req, res) => {
  await Sector.find({})
    .then((result) => {
      res.status(200).json({
        success: true,
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        error: err,
      });
      console.log(err);
    });
};

getMasterSector = async (req, res) => {
  await MasterSector.find({})
    .then((result) => {
      console.log(result);
      res.status(200).json({
        success: true,
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        error: err,
      });
      console.log(err);
    });
};

module.exports = { createSector, updateSector, getSectors, getMasterSector };
