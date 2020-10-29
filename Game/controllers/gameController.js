import { Board } from '../models/board.js';
import { Robot } from '../models/robot.js';

export class GameController {

    constructor(finalBoardCoordinates, robotsArray) {
        this.board = new Board(finalBoardCoordinates[0], finalBoardCoordinates[1]);
        this.robots = this.initializeRobots(robotsArray);
        console.log(this.board);
        console.log(this.robots);
    }

    initializeRobots(robotsArray) {
        let initilaizedRobots = [];

        for (let i = 0; i < robotsArray.length; i++) {
            initilaizedRobots.push( new Robot(robotsArray[i].coordinates, robotsArray[i].aiming, robotsArray[i].movements));
        }

        return initilaizedRobots;
    }

    start() {
        
    }

}