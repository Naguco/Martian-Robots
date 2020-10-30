const express = require('express');
const GameController = require('../controllers/gameController');

const app = express();

app.post('/RobotsGame', GameController.startGame);
app.get('/RobotsGame/games', GameController.getGames);
app.get('/RobotsGame/robotsLost', GameController.getTotalRobotsLost);

module.exports = app;