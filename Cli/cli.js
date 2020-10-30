const prompt = require('prompt');
const Game = require('../Game/game');

module.exports = function startCLI() {
  var schema = {
      properties: {
        data: {
          message: 'Insert your data. (Take care with the \\n\ and whitespaces)',
          required: true
        }
      }
  };

  const game = new Game();

  prompt.start();

  prompt.get(schema, function (err, result) {
      let output = game.startGame(schema.data);
      console.log(output);
  });
};