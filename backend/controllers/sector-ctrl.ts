import { Request, Response } from "express";
import MasterSector from '../models/master-sector-model';
import Sector from '../models/sector-model';

const createSector = (req: Request, res: Response) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a valid Sector',
    });
  }
  const sector = new Sector(body);
  console.log(sector);
  // if (!sector) {
  //   return res.status(400).json({ success: false, error: "Failed to create sector!" });
  // }

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
      console.log(error);
      return res.status(400).json({
        error,
        message: 'Failed to create sector!',
      });
    });
};

const updateSector = async (req: Request<{ id: string}>, res: Response) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update',
    });
  }
  await Sector.findOne({ _id: req.params.id })
    .then((sector) => {
      sector!.name = body.name;
      sector!.sectors = body.sectors;
      sector!.agree_to_term = body.agree_to_term;
      sector!.save();
      res.status(200).json({
        success: true,
        id: sector!._id,
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

const getSectors = async (req: Request, res: Response) => {
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

const getMasterSector = async (req: Request, res: Response) => {
  await MasterSector.find({})
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
const SectorCtrl = { createSector, updateSector, getSectors, getMasterSector };
export default SectorCtrl;
