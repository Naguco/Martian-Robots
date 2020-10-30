module.exports = function percentageExplored(board, surfaceExplored) {
    let area = board.finalX * board.finalY;
    return (surfaceExplored.length * 100) / area;
};