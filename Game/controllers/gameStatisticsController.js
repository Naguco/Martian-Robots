const GameModelDatabase = require('../../Database/models/gameModel');
const GameConfig = require('../Config/gameConfig');

/**
 * Class to define game statistics.
*/
module.exports = class GameStatisticsController {

    /**
     * Menu for selecting what type of statistics want to return.
     * @param {number} option 0 for retrieving last games played, 1 for retrieving total robots lost in all games.
     * @returns {any} returns data depending the option.
    */
    async optionsGameStatistics(option) {
        let data;

        switch(option) {
            case 0: // Get all games
                data = await this.retrieveLastGamesPlayed();
                break;
            case 1: // Get total number of robots lost
                data = await this.retrieveTotalRobotsLost();
                break;
        }

        return data;
    }

    /**
     * Function to retrieve last games played.
     * @returns {any} It returns the games played or a message that there are no games played.
    */
    async retrieveLastGamesPlayed() {
        try {
            let gamesPlayed = await GameModelDatabase.getGames();
            if (gamesPlayed && gamesPlayed.length > 0) {
                return gamesPlayed;
            } else {
                return GameConfig.messageNoGamesPlayed;
            }
        } catch (err) {
            return GameConfig.errorGetGameData;
        }
    }

    /**
     * Function that retrieves all the robots lost in all games.
     * @returns {any} It returns a number with robots lost or a message error.
    */
    async retrieveTotalRobotsLost() {
        try {
            let gamesPlayed = await GameModelDatabase.getGames();
            let robotsLost = 0;
            if (gamesPlayed) {
                for (let i = 0; i < gamesPlayed.length; i++) {
                    robotsLost += gamesPlayed[i].relevantInformation.robotsLost;
                }
            }
            return robotsLost;
        } catch(err) {
            return GameConfig.errorGetGameData;
        }
    }

};