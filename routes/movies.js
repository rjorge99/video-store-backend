const { Genre } = require('../models/genre');
const { Movie, validateMovie } = require('../models/movie');
const { Router } = require('express');
const admin = require('../middlewares/admin');
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const router = Router();
const validateId = require('../middlewares/validateObjectId');

router.get('/', async (req, res) => {
    const movies = await Movie.find().select('-__v').sort('title');
    res.send(movies);
});

router.get('/:id', [validateId], async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if (!movie) return res.status(404).send('Movie not found');

    res.send(movie);
});

router.post('/', [auth, validate(validateMovie)], async (req, res) => {
    const { title, numberInStock, dailyRentalRate, genreId } = req.body;

    const genre = await Genre.findById(genreId);
    if (!genre) return res.status(404).send('Genre not found');

    const movie = new Movie({
        title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock,
        dailyRentalRate
    });
    await movie.save();

    res.send(movie);
});

router.delete('/:id', [auth, admin, validateId], async (req, res) => {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    if (!movie) return res.status(404).send('Movie not found');

    res.send(movie);
});

module.exports = router;
