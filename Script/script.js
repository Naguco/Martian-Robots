const Game = require('../Game/game');

module.exports = function startScript(secondArgument) {
    // It's important to take care about whitespaces and new lines for the correct running of the program.
    let data = secondArgument;

    let game = new Game();

    let output = game.startGame(data);

    console.log(output);
};