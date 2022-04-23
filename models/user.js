const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        min: 5,
        max: 20,
        required: true
    },
    password: {
        type: String,
        min: 5,
        max: 20,
        required: true
    },
    email: {
        type: String,
        min: 5,
        max: 200,
        required: true,
        unique: true
    }
});

const validateUser = (user) => {
    const schema = Joi.object({
        username: Joi.string().min(5).max(20).required(),
        password: Joi.string().min(5).max(20).required(),
        email: Joi.string().min(5).max(200).email()
    });

    return schema.validate(user);
};

module.exports = {
    User: mongoose.model('User', userSchema),
    validateUser
};
