const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', (req, res) => {
    db.query('SELECT * FROM Movie', (err, rows, fields) => {
        if (err) throw err;

        res.send(rows);
    })
})

module.exports = router;