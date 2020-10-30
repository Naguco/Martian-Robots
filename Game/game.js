const GameController = require('./controllers/gameController');
const GameConfig = require('./Config/gameConfig');
const convertData = require('./helpers/dataConversion');
const isValid = require('./helpers/dataValidator');
const DatabaseGameModel = require('../Database/models/gameModel');

module.exports = class Game {

    startGame( data ) {
        let dataConverted;
        try {
            dataConverted = convertData(data);
        } catch (err) {
            return GameConfig.errorInputMessage;
        }
        if (isValid(dataConverted)) {
            let gameController = new GameController(dataConverted.boardCoordinates, dataConverted.robots);
            let output = gameController.start();
            DatabaseGameModel.generateGameRegister(data, output, gameController.relevantInformation);
            return output;
        } else {
            return GameConfig.errorInputMessage;
        }
    }

};
