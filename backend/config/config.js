const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    "development": {
        "username": "root",
        "password": process.env.DB_PASSWORD,
        "database": "xploit-crp",
        "host": process.env.DB_HOST,
        "dialect": "mysql"
    },
    "test": {
        "username": "root",
        "password": process.env.DB_PASSWORD,
        "database": "xploit-crp",
        "host": process.env.DB_HOST,
        "dialect": "mysql"
    },
    "production": {
        "username": "root",
        "password": process.env.DB_PASSWORD,
        "database": "xploit-crp",
        "host": process.env.DB_HOST,
        "dialect": "mysql"
    }
}
