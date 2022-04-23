const mongoose = require('mongoose');
const { genreSchema } = require('../models/genre');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const movieSchema = mongoose.Schema({
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
});

const validateMovie = (movie) => {
    const schema = Joi.object({
        title: Joi.string().required().min(5).max(200),
        genreId: Joi.objectId().require(),
        numberInStock: Joi.number().required().min(0).max(255),
        dailyRentalRate: Joi.number().required().min(0).max(255)
    });

    return schema.validate(movie);
};

module.exports.Movie = mongoose.model('Movie', movieSchema);
module.exports.validateMovie = validateMovie;