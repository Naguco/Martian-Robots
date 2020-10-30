const Game = require('./schemas/gameSchema');

module.exports.generateGameRegister = function(input, output, relevantInformation) {
    let newGame = new Game({
        input: input,
        output: output,
        relevantInformation: relevantInformation
    });

    return newGame.save(); 
};

module.exports.getGames = function() {
    return Invitacion.find().exec();
};