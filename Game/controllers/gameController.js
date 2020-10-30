const Board = require('../models/board');
const Robot = require('../models/robot');
const GameConfig = require('../Config/gameConfig');

module.exports = class GameController {

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

    initializeRobots(robotsArray) {
        let initilaizedRobots = [];

        for (let i = 0; i < robotsArray.length; i++) {
            initilaizedRobots.push(new Robot(robotsArray[i].coordinates, robotsArray[i].aiming, robotsArray[i].movements));
        }

        return initilaizedRobots;
    }

    start() {
        let output = "";
        for (let i = 0; i < this.robots.length; i++) {
            output += this.startRobot(this.robots[i]) + '\n';
        }
        return output;
    }

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

    moveRight(robot) {
        let index = this.possibleAiming.indexOf(robot.actualAiming);
        let newIndex = (index + 1) % this.possibleAiming.length;
        robot.actualAiming = this.possibleAiming[newIndex];
        robot.lastAiming = this.possibleAiming[index];
        robot.movementsRemaining.shift();
    }

    moveLeft(robot) {
        let index = this.possibleAiming.indexOf(robot.actualAiming);
        let newIndex = (index - 1 + this.possibleAiming.length) % this.possibleAiming.length;
        robot.actualAiming = this.possibleAiming[newIndex];
        robot.lastAiming = this.possibleAiming[index];
        robot.movementsRemaining.shift();
    }

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

    saveSurfaceExplored(robot) {
        if (!this.isSurfaceExplored(robot)) {
            this.relevantInformation.surfaceExplored.push([robot.actualCoordinates[0], robot.actualCoordinates[1]]);
        }
    }

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