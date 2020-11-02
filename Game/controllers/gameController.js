const Board = require('../models/board');
const Robot = require('../models/robot');
const GameConfig = require('../Config/gameConfig');

/**
 * Class to define game functionalities.
*/
module.exports = class GameController {

    /**
     * Constructor of the GameController.
     * @param {Array} finalBoardCoordinates Array that contains two values, coordinate X and Y.
     * @param {Array<Object>} robotsArray Array that contains the values of all robots. Position, aiming and movements.
     * @param {Array<number>} robotsArray.coordinates Contains the robots initial coordinates pair.
     * @param {string} robotsArray.aiming Contains where is watching the robot to [N, E, W, S];
     * @param {string} robotsArray.movements Contains the movements of the robot.
    */
    constructor(finalBoardCoordinates, robotsArray) {
        this.board = new Board(finalBoardCoordinates[0], finalBoardCoordinates[1]);
        this.robots = this.initializeRobots(robotsArray);
        this.possibleAiming = GameConfig.possibleAiming;
        this.possibleForwards = GameConfig.possibleForwards; // North, east, south, west respectively
        this.boardLimitsSaved = [];
        this.relevantInformation = {
            robotsLost: 0,
            surfaceExplored: []
        };
    }

    /**
     * Parse robots array to an array of robot objects.
     * @param {Array<Object>} robotsArray Array that contains the values of all robots. Position, aiming and movements.
     * @param {Array<number>} robotsArray.coordinates Contains the robots initial coordinates pair.
     * @param {string} robotsArray.aiming Contains where is watching the robot to [N, E, W, S];
     * @param {string} robotsArray.movements Contains the movements of the robot.
     * @returns {Array<Robot>} returns an array of robots objects.
    */
    initializeRobots(robotsArray) {
        let initilaizedRobots = [];

        for (let i = 0; i < robotsArray.length; i++) {
            initilaizedRobots.push(new Robot(robotsArray[i].coordinates, robotsArray[i].aiming, robotsArray[i].movements));
        }

        return initilaizedRobots;
    }

    /**
     * Start the game.
     * @returns {string} Returns the final game output.
     */
    start() {
        let output = "";
        for (let i = 0; i < this.robots.length; i++) {
            if (output === "") {
                output += this.startRobot(this.robots[i]);
            } else {
                output += '\n' + this.startRobot(this.robots[i]);
            }
        }
        return output;
    }

    /**
     * Start the next robot execution.
     * @param {Robot} robot Robot object.
     * @returns {string} Returns the position of the robot and where is he aiming. Also return if the robot is lost.
    */
    startRobot(robot) {
        this.saveSurfaceExplored(robot);
        while (robot.movementsRemaining.length > 0 && !robot.lost) {
            switch (robot.movementsRemaining[0]) {
                case 'F':
                    this.moveForward(robot);
                    break;
                case 'R':
                    this.moveRight(robot);
                    break;
                case 'L':
                    this.moveLeft(robot);
                    break;
            }
        }
        if (robot.lost) {
            return robot.lastCoordinates[0] + ' ' + robot.lastCoordinates[1] + ' ' + robot.lastAiming + ' LOST';
        }
        return robot.actualCoordinates[0] + ' ' + robot.actualCoordinates[1] + ' ' + robot.actualAiming;
    }

    /**
     * Moves forward the robot.
     * @param {Robot} robot Robot object.
    */
    moveForward(robot) {
        if (!this.repeatOthersMistake(robot)) {
            let index = this.possibleAiming.indexOf(robot.actualAiming);
            robot.lastCoordinates = [robot.actualCoordinates[0], robot.actualCoordinates[1]];
            robot.actualCoordinates[0] = robot.actualCoordinates[0] + this.possibleForwards[index][0];
            robot.actualCoordinates[1] = robot.actualCoordinates[1] + this.possibleForwards[index][1];

            robot.lastAiming = robot.actualAiming;
    
            if (this.checkFall(robot)) {
                robot.lost = true;
                this.relevantInformation.robotsLost++;
            } else {
                this.saveSurfaceExplored(robot);
            }

        }
        robot.movementsRemaining.shift();
    }

    /**
     * Moves right the robot.
     * @param {Robot} robot Robot object.
    */
    moveRight(robot) {
        let index = this.possibleAiming.indexOf(robot.actualAiming);
        let newIndex = (index + 1) % this.possibleAiming.length;
        robot.actualAiming = this.possibleAiming[newIndex];
        robot.lastAiming = this.possibleAiming[index];
        robot.movementsRemaining.shift();
    }

    /**
     * Moves left the robot.
     * @param {Robot} robot Robot object.
    */
    moveLeft(robot) {
        let index = this.possibleAiming.indexOf(robot.actualAiming);
        let newIndex = (index - 1 + this.possibleAiming.length) % this.possibleAiming.length;
        robot.actualAiming = this.possibleAiming[newIndex];
        robot.lastAiming = this.possibleAiming[index];
        robot.movementsRemaining.shift();
    }

    /**
     * Check if another robot has fallen with the next movement.
     * @param {Robot} robot Robot object.
     * @returns {boolean} returns if the robots is going to repeat another robots mistake of falling if he moves forward.
    */
    repeatOthersMistake(robot) {
        let repeatOthersMistake = false;
        for (let i = 0; i < this.boardLimitsSaved.length; i++) {
            if (this.boardLimitsSaved[i][0] == robot.actualCoordinates[0] && 
                this.boardLimitsSaved[i][1] == robot.actualCoordinates[1] &&
                this.boardLimitsSaved[i][2] == robot.actualAiming) {
                    repeatOthersMistake = true;
                }
        }
        return repeatOthersMistake;
    }

    /**
     * Check if the robot has fallen.
     * @param {Robot} robot Robot object.
     * @returns {boolean} returns if the has fallen.
    */
    checkFall(robot) {
        if (robot.actualCoordinates[0] > this.board.finalX ||
            robot.actualCoordinates[1] > this.board.finalY ||
            robot.actualCoordinates[0] < 0 ||
            robot.actualCoordinates[1] < 0) {
                this.boardLimitsSaved.push([robot.lastCoordinates[0], robot.lastCoordinates[1], robot.lastAiming]);
                return true;
        }
        return false;
    }

    /**
     * Saves the robot position if anybody else has visited it.
     * @param {Robot} robot Robot object.
     * @returns {boolean} returns if the robots is going to repeat another robots mistake of falling if he moves forward.
    */
    saveSurfaceExplored(robot) {
        if (!this.isSurfaceExplored(robot)) {
            this.relevantInformation.surfaceExplored.push([robot.actualCoordinates[0], robot.actualCoordinates[1]]);
        }
    }

    /**
     * Check if any other robot has visited that position
     * @param {Robot} robot 
     * @returns {boolean} Returns if any other robot has visited that position.
    */
    isSurfaceExplored(robot) {
        for (let i = 0; i < this.relevantInformation.surfaceExplored.length; i++) {
            if (this.relevantInformation.surfaceExplored[i][0] == robot.actualCoordinates[0] && 
                this.relevantInformation.surfaceExplored[i][1] == robot.actualCoordinates[1]) {
                    return true;
                }
        }
        return false;
    }

};