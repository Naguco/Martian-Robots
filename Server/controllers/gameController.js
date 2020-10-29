const Game = require('../../Game/game');

exports.startGame = async function(req, res) {

    try {

        let data = req.body.data;

        let game = new Game();

        let output = game.startGame(data);

        return res.status(200).json({
            output
        });

    } catch (err) {
        console.log(err);
    }

};