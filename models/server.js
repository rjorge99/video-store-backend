const cors = require('cors');
const express = require('express');
const error = require('../middlewares/error');

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
        this.app.use('/api/genres', require('../routes/genres'));
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
