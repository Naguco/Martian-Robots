const express = require('express');

const app = express();

const gameRouter = require('./gameRoute.js');

// Routes implementation
app.use(gameRouter);

module.exports = app;

