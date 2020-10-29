export class Robot {

    constructor (firstCoordinates, firstAiming, movements) {
        this.actualCoordinates = firstCoordinates;
        this.lastCoordinates = [];
        this.aiming = firstAiming;
        this.movementsRemaining = movements;
        this.lost = false;
    }

    get robotMovementsRemaining() {
        return this.movementsRemaining;
    }

    get robotActualCoordinates() {
        return this.actualCoordinates;
    }

    get robotlastCoordinates() {
        return this.lastCoordinates;
    }

    get robotAiming() {
        return this.aiming;
    }

}