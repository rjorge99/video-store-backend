const Genre = require('../models/genre');
const objectId = require('../middlewares/objectId');
const { Router } = require('express');
const router = Router();

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.get('/:id', [objectId], async (req, res) => {
    const genre = await Genre.findById(req.params.id);

    if (!genre) return res.status(404).send('Genre not found');

    res.send(genre);
});

router.post('/', async (req, res) => {
    const genre = new Genre(req.body);
    await genre.save();
    res.send(genre);
});

router.delete('/:id', [objectId], async (req, res) => {
    const genre = await Genre.findByIdAndDelete(req.params.id);

    if (!genre) return res.status(404).send('Genre not found');

    res.send(genre);
});

module.exports = router;
