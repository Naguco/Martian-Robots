const Game = require('../../Game/game');


/**
 * Function that calls game to start it.
 * @param {Object} req express require.
 * @param {Object} res express response.
 */
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
        res.status(500).json({ output: "Internal server error." });
    }
};