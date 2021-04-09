const mysql = require('mysql');

// Todo: Move this info into a .env if we're feeling ~ secure ~
const db = mysql.createConnection({
    host: 'localhost',
    user: 'project',
    password: 'password',
    port: 8889,
    database: 'movie_dataset'
});

db.connect();

module.exports = db;