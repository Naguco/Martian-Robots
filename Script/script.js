const ScriptConfig = require('./config/scriptConfig');
const Game = require('../Game/game');


/**
 * Function that starts the Script.
*/
module.exports = async function startScript() {
    let game = new Game();

    let outputGame = await game.startGame(ScriptConfig.stringInput);
    console.log("---------------------- Game execution output ----------------------");
    console.log(outputGame);
    console.log("-------------------------------------------------------------------");

    let outputPastExecutions = await game.retrieveGameStatistics(0);
    console.log("--------------------- Past executions output ----------------------");
    console.log(outputPastExecutions);
    console.log("-------------------------------------------------------------------");

    let allRobotsLost = await game.retrieveGameStatistics(1);
    console.log("--------------------- All robots lost output ----------------------");
    console.log(allRobotsLost);
    console.log("-------------------------------------------------------------------");

    process.exit(1);
};