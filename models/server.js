const cors = require('cors');
const error = require('../middlewares/error');
const express = require('express');

require('dotenv').config();
require('express-async-errors');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use('/api/auth', require('../routes/auth'));
        this.app.use('/api/customers', require('../routes/customers'));
        this.app.use('/api/genres', require('../routes/genres'));
        this.app.use('/api/movies', require('../routes/movies'));
        this.app.use('/api/rentals', require('../routes/rentals'));
        this.app.use('/api/users', require('../routes/users'));
        this.app.use(error);
    }

    startup() {
        require('../services/dbService')();
        this.middlewares();
    }

    execute() {
        this.startup();
        this.app.listen(this.port, () => {
            console.log(`Server running in port ${this.port}`);
        });
    }
}

module.exports = Server;
