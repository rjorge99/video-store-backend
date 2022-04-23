const { Router } = require('express');
const { User } = require('../models/user');
const router = Router();
const Joi = require('joi');
const { compare } = require('../utils/bcrypt');

router.get('/', async (req, res) => {
    const { error } = validateAuth(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).send('Invalid username or password');

    const isPasswordValid = compare(user.password, req.body.password);
    if (!isPasswordValid) return res.status(400).send('Invalid username or password');

    const token = user.generateAuthToken();
    res.send(token);
});

const validateAuth = (data) => {
    const schema = Joi.object({
        username: Joi.string().required().min(5).max(255),
        password: Joi.string().required().min(5).max(255)
    });

    return schema.validate(data);
};

module.exports = router;
