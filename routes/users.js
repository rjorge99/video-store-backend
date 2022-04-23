const { Router } = require('express');
const auth = require('../middlewares/auth');
const router = Router();
const { User, validateUser } = require('../models/user');
const { encrypter } = require('../utils/bcrypt');

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password -__v');
    res.send(user);
});

router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already exists');

    user = new User({
        username: req.body.username,
        email: req.body.email
    });
    user.password = await encrypter(req.body.password);
    await user.save();

    res.send(user);
});

module.exports = router;
