const GameModelDatabase = require('../../Database/models/gameModel');
const GameConfig = require('../Config/gameConfig');

module.exports = class GameStatisticsController {

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