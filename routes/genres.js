const { Genre, validateGenre } = require('../models/genre');
const validateId = require('../middlewares/objectId');
const { Router } = require('express');
const router = Router();

router.get('/', async (req, res) => {
    const genres = await Genre.find().select('-__v').sort('name');
    res.send(genres);
});

router.get('/:id', [validateId], async (req, res) => {
    const genre = await Genre.findById(req.params.id);

    if (!genre) return res.status(404).send('Genre not found');

    res.send(genre);
});

router.post('/', async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = new Genre(req.body);
    await genre.save();

    res.send(genre);
});

router.delete('/:id', [validateId], async (req, res) => {
    const genre = await Genre.findByIdAndDelete(req.params.id);

    if (!genre) return res.status(404).send('Genre not found');

    res.send(genre);
});

module.exports = router;
