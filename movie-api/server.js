const express = require('express');
const router = require('./routes/all');

const app = express()
const PORT = 8000;

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Movie API running on port ${PORT}`);
});