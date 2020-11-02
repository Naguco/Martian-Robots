const GameController = require('./controllers/gameController');
const GameStatisticsController = require('./controllers/gameStatisticsController');
const GameConfig = require('./Config/gameConfig');
const convertData = require('./helpers/dataConversion');
const isValid = require('./helpers/dataValidator');
const percentageExplored = require('./helpers/dataAnalizer');
const DatabaseGameModel = require('../Database/models/gameModel');

/**
 * Game class
*/
module.exports = class Game {

    /**
     * Function that starts all the game process.
     * @param {string} data Data input.
     * @returns {string} Returns errors message or the game resolution.
     */
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
            gameController.relevantInformation.percentageExplored = percentageExplored(gameController.board, gameController.relevantInformation.surfaceExplored);
            DatabaseGameModel.generateGameRegister(data, output, gameController.relevantInformation);
            return output;
        } else {
            return GameConfig.errorInputMessage;
        }
    }

    /**
     * Function that retrieves the game statistics.
     * @param {number} option 0 or 1.
     * @returns {any} game statistics output.
    */
    async retrieveGameStatistics(option) {
        let gStatisticsController = new GameStatisticsController();
        return await gStatisticsController.optionsGameStatistics(option);
    }

};
