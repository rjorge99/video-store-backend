const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        minLength: 5,
        maxLength: 20,
        required: true
    },
    password: {
        type: String,
        minLength: 5,
        maxLength: 1024,
        required: true
    },
    email: {
        type: String,
        minLength: 5,
        maxLength: 200,
        required: true,
        unique: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

const validateUser = (user) => {
    const schema = Joi.object({
        username: Joi.string().min(5).max(20).required(),
        password: Joi.string().min(5).max(1024).required(),
        email: Joi.string().email().required()
    });

    return schema.validate(user);
};

userSchema.methods.generateAuthToken = () => {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
            isAdmin: this.isAdmin
        },
        process.env.JWT_SECRET
    );
};

module.exports = {
    User: mongoose.model('User', userSchema),
    validateUser
};
