const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', (req, res) => {
    const offset = req.query.page * 25 || 0;
    const demoQuery = `
        SELECT id, title, popularity, release_date, budget, vote_average
            FROM movies_metadata
            LIMIT 25 OFFSET ${offset};
    `;

    db.query(demoQuery, (err, rows, fields) => {
        if (err) throw err;
        res.send(rows);
    });
})

router.post('/createlist', function(req, res) {
    const listName = req.body.name;
    const listDescription = req.body.description;
    const createListQuery = `
        INSERT INTO userList(name)
        VALUES ${listName};
    `;

    db.query(createListQuery, function(err, result) {
        if (err) throw err;
        res.send(listName);
        res.send(listDescription);
    });
})

module.exports = router;
