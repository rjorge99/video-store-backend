const mongoose = require('mongoose');

const validateId = (req, res, next) => {
    const { id } = req.params;
    const isValidID = mongoose.isValidObjectId(id);
    if (!isValidID) return res.status(400).send('Not a valid ID.');
    next();
};

module.exports = validateId;
