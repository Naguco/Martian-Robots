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

exports.getGames = async function(req, res) {
    try {
        let game = new Game();
        let output = await game.retrieveGameStatistics(0);
        return res.status(200).json({
            output
        });
    } catch(err) {
        console.log(err);
    }
};