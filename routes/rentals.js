const { Rental } = require('../models/rental');
const { Router } = require('express');
const validateId = require('../middlewares/validateObjectId');
const router = Router();

router.get('/', async (req, res) => {
    const rentals = await Rental.find().select('-__v').sort('-dateOut');
    res.send(rentals);
});

router.get('/:id', [validateId], async (req, res) => {
    const rental = await Rental.findById(req.params.id).select('-__v');

    if (!rental) return res.status(404).send('Rental not found');

    res.send(rentals);
});

module.exports = router;
