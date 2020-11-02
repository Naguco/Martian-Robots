const Game = require('../../Game/game');

/**
 * Get games function
 * @param {Object} req express require.
 * @param {Object} res express response.
*/
exports.getGames = async function(req, res) {
    await retrieveGameStatistics(0, res);
};


/**
 * Get total robots of all games
 * @param {Object} req express require.
 * @param {Object} res express response.
*/
exports.getTotalRobotsLost = async function(req, res) {
    await retrieveGameStatistics(1, res);
};


/**
 * 
 * @param {number} option 0 for get games, 1 for get total robots lost.
 * @param {Object} res express response.
*/
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