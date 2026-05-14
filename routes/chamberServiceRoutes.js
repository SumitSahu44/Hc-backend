const express = require('express');
const router = express.Router();
const {
    getChamberServices,
    addChamberService,
    updateChamberService,
    deleteChamberService
} = require('../controllers/chamberServiceController');

router.get('/', getChamberServices);
router.post('/', addChamberService);
router.put('/:id', updateChamberService);
router.delete('/:id', deleteChamberService);

module.exports = router;
