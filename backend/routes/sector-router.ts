import express from 'express';
import SectorCtrl from '../controllers/sector-ctrl';

const SectorRouter = express.Router();

SectorRouter.post('/sector', SectorCtrl.createSector);
SectorRouter.put('/sector/:id', SectorCtrl.updateSector);
SectorRouter.get('/sectors', SectorCtrl.getSectors);
SectorRouter.get('/master_sector', SectorCtrl.getMasterSector);

export default SectorRouter;
