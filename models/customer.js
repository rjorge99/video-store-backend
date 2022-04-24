const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = mongoose.Schema({
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
});

function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().required().min(5).max(20),
        phone: Joi.string().required().min(5).max(20)
    });

    return schema.validate(customer);
}

module.exports.Customer = mongoose.model('Customer', customerSchema);
module.exports.validateCustomer = validateCustomer;
