const express = require('express');
const GameController = require('../controllers/gameController');

const app = express();

app.post('/RobotsGame', GameController.startGame);

module.exports = app;