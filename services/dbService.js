const mongoose = require('mongoose');

const databaseConnection = () => {
    mongoose
        .connect('mongodb://localhost/video-store')
        .then(() => console.log('Database connected'))
        .catch((err) => {
            console.log('An error has ocurred connecting to the database');
        });
};

module.exports = databaseConnection;
