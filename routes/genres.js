const { Genre, validateGenre } = require('../models/genre');
const { Router } = require('express');
const admin = require('../middlewares/admin');
const auth = require('../middlewares/auth');
const router = Router();
const validate = require('../middlewares/validate');
const validateId = require('../middlewares/validateObjectId');

router.get('/', async (req, res) => {
    const genres = await Genre.find().select('-__v').sort('name');
    res.send(genres);
});

router.get('/:id', [validateId], async (req, res) => {
    const genre = await Genre.findById(req.params.id);

    if (!genre) return res.status(404).send('Genre not found');

    res.send(genre);
});

router.post('/', [auth, validate(validateGenre)], async (req, res) => {
    const genre = new Genre(req.body);
    await genre.save();

    res.send(genre);
});

router.delete('/:id', [auth, admin, validateId], async (req, res) => {
    const genre = await Genre.findByIdAndDelete(req.params.id);

    if (!genre) return res.status(404).send('Genre not found');

    res.send(genre);
});

module.exports = router;
