const auth = require('../middlewares/auth');
const Fawn = require('fawn');
const Joi = require('joi');
const validate = require('../middlewares/validate');
const validateId = require('../middlewares/validateObjectId');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');
const { Rental } = require('../models/rental');
const { Router } = require('express');
const router = Router();
Joi.objectId = require('joi-objectid')(Joi);

Fawn.init('mongodb://localhost/video-store');

router.get('/', async (req, res) => {
    const rentals = await Rental.find().select('-__v').sort('-dateOut');
    res.send(rentals);
});

router.get('/:id', [validateId], async (req, res) => {
    const rental = await Rental.findById(req.params.id).select('-__v');

    if (!rental) return res.status(404).send('Rental not found');

    res.send(rentals);
});

router.post('/', [auth, validate(validateRental)], async (req, res) => {
    const { movieId, customerId } = req.body;

    const customer = await Customer.findById(customerId);
    if (!customer) return res.status(404).send('Customer not found');

    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).send('Movie not found');

    if (movie.numberInStock === 0) return res.send('Movie not in stock.');

    const rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });

    try {
        const task = new Fawn.Task()
            .save('rentals', rental)
            .update('movies', { _id: movie._id }, { $inc: { numberInStock: -1 } })
            .run();

        res.send(rental);
    } catch (error) {
        res.status(500).send('An error occurred while saving');
    }
});

function validateRental(rental) {
    const schema = Joi.object({
        movieId: Joi.objectId().required(),
        customerId: Joi.objectId().required()
    });

    return schema.validate(rental);
}

module.exports = router;
