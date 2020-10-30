const Game = require('../../Game/game');

exports.getGames = async function(req, res) {
    try {
        let game = new Game();
        let output = await game.retrieveGameStatistics(0);
        return res.status(200).json({
            output
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({ output: "Internal server error." });
    }
};

exports.getTotalRobotsLost = async function(req, res) {
    try {
        let game = new Game();
        let output = await game.retrieveGameStatistics(1);
        return res.status(200).json({
            output
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({ output: "Internal server error." });
    }
};