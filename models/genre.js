const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 5,
        max: 50
    }
});

const validateGenre = (genre) => {
    const schema = Joi.object({
        name: Joi.string().required().min(5).max(50)
    });

    return schema.validate(genre);
};

module.exports.Genre = mongoose.model('Genre', genreSchema);
module.exports.genreSchema = genreSchema;
module.exports.validateGenre = validateGenre;
