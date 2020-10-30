const Game = require('../../Game/game');

exports.getGames = async function(req, res) {
    await retrieveGameStatistics(0, res);
};

exports.getTotalRobotsLost = async function(req, res) {
    await retrieveGameStatistics(1, res);
};

async function retrieveGameStatistics(option, res) {
    try {
        let game = new Game();
        let output = await game.retrieveGameStatistics(option);
        return res.status(200).json({
            output
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({ output: "Internal server error." });
    }
}