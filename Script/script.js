const Game = require('../Game/game');

module.exports = function startScript() {
    // It's important to take care about whitespaces and new lines for the correct running of the program.
    let data = '5 3\n1 1 E\nRFRFRFRF\n3 2 N\nFRRFLLFFRRFLL\n0 3 W\nLLFFFLFLFL';

    let game = new Game();

    let output = game.startGame(data);

    console.log(output);
};