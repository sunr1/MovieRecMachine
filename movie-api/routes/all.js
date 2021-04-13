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

module.exports = router;