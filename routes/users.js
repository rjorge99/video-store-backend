const { encrypter } = require('../utils/bcrypt');
const { Router } = require('express');
const { User, validateUser } = require('../models/user');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const router = Router();

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password -__v');
    res.send(user);
});

router.post('/', validate(validateUser), async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already exists');

    user = new User({
        username: req.body.username,
        email: req.body.email
    });
    user.password = await encrypter(req.body.password);
    await user.save();

    const token = user.generateAuthToken();

    res.header('x-auth-token', token).header('access-control-expose-headers', 'x-auth-token').send({
        username: user.username,
        email: user.email,
        _id: user._id
    });
});

module.exports = router;
