const Game = require('../../Game/game');

module.exports = class ScriptController {

    parseData(data) {
        while (data.includes("\\n")) {
            data = data.replace("\\n", "\n");
        }
        return data;
    }

    async checkOption(option) {
        let output;
        switch(option) {
            case 'totalRobotsLost':
                output = await this.getTotalRobotsLost();
                break;
            case 'getAllGames':
                output = await this.getAllGames();
                break;
            default:
                output = this.sendInputToGame(option);
                break;
        }
        return output;
    }

    sendInputToGame(data) {
        let game = new Game();
        let parsedData = this.parseData(data);
        return game.startGame(parsedData);
    }

    async getAllGames() {
        return await this.getGameStatistics(0);
    }

    async getTotalRobotsLost() {
        return await this.getGameStatistics(1);
    }

    async getGameStatistics(option) {
        try {
            let game = new Game();
            let output = await game.retrieveGameStatistics(option);
            return output;
        } catch(err) {
            console.log('An error ocurred while your petition. Please check documentation.');
        }
    }

};