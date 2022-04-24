const { genreSchema } = require('../models/genre');
const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const rentalSchema = mongoose.Schema({
    customer: {
        type: mongoose.Schema({
            name: {
                type: String,
                minLength: 5,
                maxLength: 20,
                required: true
            },
            phone: {
                type: String,
                minLength: 5,
                maxLength: 20,
                required: true
            },
            isGold: {
                type: Boolean,
                default: false
            }
        }),
        required: true
    },
    movie: {
        type: mongoose.Schema({
            title: {
                type: String,
                required: true,
                minLength: 5,
                maxLength: 200,
                trim: true
            },
            genre: {
                type: genreSchema,
                required: true
            },
            numberInStock: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        default: Date.now,
        required: true
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
});

function validateRental(rental) {
    const schema = Joi.object({
        movieId: Joi.objectId().required(),
        customerId: Joi.objectId().required()
    });

    return schema.validate(rental);
}

module.exports.Rental = mongoose.model('Rental', rentalSchema);
module.exports.validateRental = validateRental;
