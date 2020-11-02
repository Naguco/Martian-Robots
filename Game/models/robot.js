/**
 * Robot class
 */
module.exports = class Robot {

    constructor (firstCoordinates, firstAiming, movements) {
        this.actualCoordinates = firstCoordinates;
        this.lastCoordinates = [];
        this.actualAiming = firstAiming;
        this.lastAiming = '';
        this.movementsRemaining = movements;
        this.lost = false;
    }

};