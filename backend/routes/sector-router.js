const express = require('express');

const SectorCtrl = require('../controllers/sector-ctrl');

const router = express.Router();

router.post('/sector', SectorCtrl.createSector);
router.put('/sector/:id', SectorCtrl.updateSector);
router.get('/sectors', SectorCtrl.getSectors);
router.get('/master_sector', SectorCtrl.getMasterSector);

module.exports = router;
