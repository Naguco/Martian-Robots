const Game = require('./schemas/gameSchema');

module.exports.generateGameRegister = function(data) {
    let newGame = new Game({
        input: data.input,
        output: data.output,
        relevantInformation: data.relevantInformation
    });

    return newGame.save(); 
};