const GameConfig = require('../Config/gameConfig');

/**
 * Return if the input data is valid or not.
 * @param {Object} data 
 * @returns {boolean} true if valid.
*/
module.exports = function isValid(data) {

    let isValid;

    try {
        isValid = coordinatesValid(data.boardCoordinates) && allRobotsValid(data.robots, data.boardCoordinates);
    } catch (err) {
        return false;
    }
    return isValid;
};

/**
 * Return if the coordinates are valid or not.
 * @param {Array} coordinates 
 * @returns {boolean} true if valid.
*/
function coordinatesValid(coordinates) {
    if (coordinates.length != 2) {
        return false;
    }

    if (isNaN(coordinates[0]) || isNaN(coordinates[1])) {
        return false;
    }

    if (coordinates[0] > GameConfig.maximumCoordinate || coordinates[1] > GameConfig.maximumCoordinate) {
        return false;
    }

    return true;
}

/**
 * Returns if the robots sent are valid or not.
 * @param {Array} robots Array of robots.
 * @param {Array} boardCoordinates Array of right superior corner of the board.
 * @returns {boolean} true if valid.
*/
function allRobotsValid(robots, boardCoordinates) {
    for (let i = 0; i < robots.length; i++) {
        if (!checkRobot(robots[i], boardCoordinates)) {
            return false;
        }
    }
    return true;
}

/**
 * Returns if the robot sent is valid or not.
 * @param {Array} robots Array of robots.
 * @param {Array} boardCoordinates Array of right superior corner of the board.
 * @returns {boolean} true if valid.
*/
function checkRobot(robot, boardCoordinates) {

    if (!coordinatesValid(robot.coordinates)) {
        return false;
    }

    if (robot.coordinates[0] > boardCoordinates[0] || robot.coordinates[1] > boardCoordinates[1] || 
        robot.coordinates[0] < 0 || robot.coordinates[1] < 0) {
        return false;
    }

    if (!GameConfig.possibleAiming.includes(robot.aiming)) {
        return false;
    }

    if (robot.movements.length > GameConfig.maximumInstructionsLength) {
        return false;
    }

    for (let i = 0; i < robot.movements.length; i++) {
        if (!GameConfig.possibleInstructions.includes(robot.movements[i])) {
            return false;
        }
    }

    return true;

}

