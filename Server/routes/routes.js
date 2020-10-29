const express = require('express');

const app = express();

const gameRouter = require('./gameRoute.js');

app.use(gameRouter);

module.exports = app;

