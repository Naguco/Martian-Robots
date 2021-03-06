// File that contains all the configurations of the game.
module.exports.possibleAiming = ['N', 'E', 'S', 'W'];
module.exports.possibleInstructions = ['R', 'L', 'F'];
module.exports.possibleForwards = [[0, 1], [1, 0], [0, -1], [-1, 0]];
module.exports.maximumCoordinate = 50;
module.exports.maximumInstructionsLength = 100;
module.exports.errorInputMessage = "Invalid data input. Check documentation for input instructions";
module.exports.errorGetGameData = "It wasn't possible to get data, please check the documentation";
module.exports.messageNoGamesPlayed = "No games played at the moment.";
module.exports.messageNoRobotsLost = "No robots lost at the moment";