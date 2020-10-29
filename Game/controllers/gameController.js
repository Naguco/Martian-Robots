import { Board } from '../models/board.js';
import { Robot } from '../models/robot.js';

export class GameController {

    constructor(finalBoardCoordinates, robotsArray) {
        this.board = new Board(finalBoardCoordinates[0], finalBoardCoordinates[1]);
        this.robots = this.initializeRobots(robotsArray);
        this.possibleAiming = ['N', 'E', 'S', 'W'];
        this.possibleForwards = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // North, east, south, west respectively
        this.boardLimitsSaved = [];
        console.log(this.board);
    }

    initializeRobots(robotsArray) {
        let initilaizedRobots = [];

        for (let i = 0; i < robotsArray.length; i++) {
            initilaizedRobots.push(new Robot(robotsArray[i].coordinates, robotsArray[i].aiming, robotsArray[i].movements));
        }

        return initilaizedRobots;
    }

    start() {
        for (let i = 0; i < this.robots.length; i++) {
            this.startRobot(this.robots[i]);
        }
    }

    startRobot(robot) {
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
        console.log(robot);
    }

    moveForward(robot) {

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
        let newIndex = (index - 1) % this.possibleAiming.length;
        if (newIndex < 0) {
            newIndex = this.possibleAiming.length + newIndex;
        }
        robot.actualAiming = this.possibleAiming[newIndex];
        robot.lastAiming = this.possibleAiming[index];
        robot.movementsRemaining.shift();
    }

}