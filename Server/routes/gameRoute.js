const express = require('express');
const GameController = require('../controllers/gameController');
const GameStatisticsController = require('../controllers/gameStatisticsController');
const LandingPageController = require('../controllers/landingPageController');

const app = express();


// Routes definitions
app.get('', LandingPageController.landingPage);
app.post('/RobotsGame', GameController.startGame);
app.get('/RobotsGame/games', GameStatisticsController.getGames);
app.get('/RobotsGame/robotsLost', GameStatisticsController.getTotalRobotsLost);

module.exports = app;