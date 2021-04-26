const mysql = require('mysql');

// Todo: Move this info into a .env if we're feeling ~ secure ~
const db = mysql.createConnection({
    host: 'localhost', // Always localhost
    user: 'project', // Depends on your connection, probably root
    password: 'password',
    port: 8889, // same
    database: 'movie_dataset' // same
});

db.connect();

module.exports = db;