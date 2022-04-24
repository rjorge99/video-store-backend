const { Customer, validateCustomer } = require('../models/customer');
const { Router } = require('express');
const admin = require('../middlewares/admin');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const validateId = require('../middlewares/validateObjectId');
const router = Router();

router.get('/', async (req, res) => {
    const customers = await Customer.find().select('-__v').sort('name');
    res.send(customers);
});

router.get('/:id', [validateId], async (req, res) => {
    const customer = await Customer.findById(req.params.id).select('-__v');

    if (!customer) return res.status(404).send('Customer not found');

    res.send(customer);
});

router.post('/', [auth, validate(validateCustomer)], async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = new Customer(req.body);
    await customer.save();

    res.send(customer);
});

router.delete('/:id', [auth, admin, validateId], async (req, res) => {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (!customer) return res.status(404).send('Customer not found');

    res.send(customer);
});

module.exports = router;
