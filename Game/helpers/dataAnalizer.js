/**
 * Function that returns the percentage of the area explored.
 * @param {Board} board 
 * @param {Array} surfaceExplored
 * @returns {number} Returns the percentage of the area explored. 
*/
module.exports = function percentageExplored(board, surfaceExplored) {
    let area = board.finalX * board.finalY;
    return (surfaceExplored.length * 100) / area;
};