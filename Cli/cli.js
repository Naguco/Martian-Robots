const prompt = require('prompt');
const Game = require('../Game/game');

module.exports = function startCLI() {
  var schema = {
      properties: {
        data: {
          message: 'Insert your data. (Take care with the \\n\ and whitespaces)',
          type: 'string',
          required: true
        }
      }
  };

  const game = new Game();

  prompt.start();

  prompt.get(schema, function (err, result) {
      let data = result.data;
      while (data.includes("\\n")) {
        data = data.replace("\\n", "\n");
      }
      let output = game.startGame(data);
      console.log(output);
  });
};