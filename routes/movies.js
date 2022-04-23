const { Router } = require('express');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const validateId = require('../middlewares/validateObjectId');
const router = Router();
const { Movie, validateMovie } = require('../models/movie');
const { Genre } = require('../models/genre');

router.get('/', async (req, res) => {
    const movies = await Movie.find().select('-__v').sort('title');
    res.send(movies);
});

router.get('/:id', [validateId], async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if (!movie) return res.status(404).send('Movie not found');

    res.send(movie);
});

router.post('/', auth, async (req, res) => {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

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
