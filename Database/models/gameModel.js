const Game = require('./schemas/gameSchema');

/**
 * 
 * @param {string} input input parsed by the player.
 * @param {string} output output retrieved by the game
 * @param {Object} relevantInformation relevant information about the game.
 * @returns {any} information about the save process.
 */
module.exports.generateGameRegister = function(input, output, relevantInformation) {

    let newGame = new Game({
        input: input,
        output: output,
        relevantInformation: relevantInformation
    });

    return newGame.save(); 
};

/**
 * @returns {any} returns the games array.
*/
module.exports.getGames = function() {
    return Game.find().exec();
};