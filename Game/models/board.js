/**
 * Board class
*/
module.exports = class Board {

    constructor(finalX, finalY) {
        this.finalX = finalX;
        this.finalY = finalY;
    }

    get boardFinalX() {
        return this.finalX;
    }

    get boardFinalY() {
        return this.finalY;
    }

};