const GameModelDatabase = require('../../Database/models/gameModel');
const GameConfig = require('../Config/gameConfig');

module.exports = class GameStatisticsController {

    async optionsGameStatistics(option) {
        let data;

        switch(option) {
            case 0: // Get all games
                data = await this.retrieveLastGamesPlayed();
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

};