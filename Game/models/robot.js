export class Robot {

    constructor (firstCoordinates, firstAiming, movements) {
        this.coordinates = firstCoordinates;
        this.aiming = firstAiming;
        this.movements = movements;
    }

    get robotMovements() {
        return this.movements;
    }

    get coordinates() {
        return this.coordinates;
    }

    get aiming() {
        return this.aiming;
    }

}