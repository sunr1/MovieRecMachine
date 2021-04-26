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

router.get('/search', (req, res) => {
    const { term } = req.query;
    const offset = req.query.page * 50 || 0;

    const searchQuery = `
        SELECT *
            FROM movie_metadata_view
            WHERE title LIKE '%${term}%'
            LIMIT 50 OFFSET ${offset}
    `

    console.log(searchQuery);

    db.query(searchQuery, (err, result) => {
        if (err) throw err;

        res.send(result);
    });
})

router.post('/createList', (req, res) => {
    const { name, description } = req.body;

    const createListQuery = `
        CALL create_movie_list(
            "${name}", 
            "${description}",
            NOW(),
            (SELECT AVG(average_popularity) FROM movie_list),
            (SELECT AVG(average_rating) FROM movie_list))
    `;

    db.query(createListQuery, (err, result) => {
        if (err) throw err;

        res.send(result);
    });
});

router.post('/addMovieToList', (req, res) => {
    const {listId, movieId} = req.body;

    const addMovieQuery = `
        CALL add_movie_to_list(
            "${listId}",
            ${movieId})
        `;

    db.query(addMovieQuery, (err, result) => {
        if (err) throw err;

        res.send(result);
    })
})

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

router.get('/getListOrder', (req, res) => {
    const { orderBy } = req.query;
    const query = `
        SELECT lst.listId, AVG(popularity) AS avg_pop, date_created
            FROM movie_list lst
                JOIN movies_in_list con ON lst.listId = con.listId
                JOIN movies_metadata mov ON con.id = mov.id
            GROUP BY lst.listId
            ORDER BY ${orderBy} DESC;
    `;

    db.query(query, (err, result) => {
        if (err) throw err;

        res.send(result);
    })
});

module.exports = router;