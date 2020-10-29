const GameController = require('./controllers/gameController');
const convertData = require('./helpers/dataConversion');

module.exports = class Game {

    startGame( data ) {
        let dataConverted = convertData(data);
        let gameController = new GameController(dataConverted.boardCoordinates, dataConverted.robots);
        let output = gameController.start();
        return output;
    }

};
