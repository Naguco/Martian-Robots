const Game = require('../../Game/game');

module.exports = class CLIController {

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
            case 'help':
                output = await this.showHelp();
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

    showHelp() {

        console.log("------------ Available commands: ------------\n");
        console.log("totalRobotsLost:", "\tShows the total of robots lost since first game played.\n");
        console.log("getAllGames", "\t\tDisplays all past games in a JSON format.\n");
        console.log("'yourInput'", "\t\tIf your input is correct, the output will be the game solution.\n");
        console.log("Example input: \t\tnode MartianRobots CLI '5 3\\n1 1 E\\nRFRFRFRF\\n3 2 N\\nFRRFLLFFRRFLL\\n0 3 W\\nLLFFFLFLFL'\n");
        console.log("---------------------------------------------");

    }



};