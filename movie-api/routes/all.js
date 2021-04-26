const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', (req, res) => {
    const offset = req.query.page * 50 || 0;
    const filter = req.query.filter;

    let view
    switch (filter) {
        case 'none':
            view = 'movie_metadata_view';
            break;
        case 'popularity':
            view = 'movie_popularity_view';
            break;
        case 'vote':
            view = 'movie_rating_view';
            break;
        default:
            view = 'movie_metadata_view';
            break;
    }

    const query = `
        SELECT * 
            FROM ${view}
            LIMIT 50 OFFSET ${offset};
    `;

    db.query(query, (err, result) => {
        if (err) throw err;

        res.send(result);
    });
});

router.post('/createList', (req, res) => {
    const { name } = req.body;

    const createListQuery = `
        INSERT INTO movie_list(listId, average_popularity, average_rating)
        VALUES ("${name}"), SELECT AVG(average_popularity) FROM movie_list, SELECT AVG(average_rating) FROM movie_list;
    `

    db.query(createListQuery, (err, result) => {
        if (err) throw err;

        res.send(result);
    });
});

router.get('/movie', (req, res) => {
    const id = req.query.id;
    const query = `
        SELECT *
            FROM movies_metadata
            WHERE id = ${id};
    `;

    db.query(query, (err, result) => {
        if (err) throw err;

        res.send(result);
    });
});

router.get('/getLists', (req, res) => {
    const query = `
        SELECT * FROM movie_list_view;
    `;

    db.query(query, (err, result) => {
        if (err) throw err;

        res.send(result);
    })
});

router.get('/')

module.exports = router;