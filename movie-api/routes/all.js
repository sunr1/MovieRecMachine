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

    db.query(demoQuery, (err, result) => {
        if (err) throw err;

        res.send(result);
    });
});

router.post('/createList', (req, res) => {
    const { name } = req.body;

    const createListQuery = `
        INSERT INTO userList(listId)
        VALUES ("${name}");
    `

    db.query(createListQuery, (err, result) => {
        if (err) throw err;

        res.send(result);
    });
})

module.exports = router;