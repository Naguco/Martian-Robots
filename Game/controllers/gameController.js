import { Board } from '../models/board';
import { Robot } from '../models/robot';

export class GameController {

    constructor(finalBoardCoordinates, robotsArray) {
        this.board = new Board(finalBoardCoordinates[0], finalBoardCoordinates[1]);
        this.robots = initializeRobots(robotsArray);
    }

    initializeRobots(robotsArray) {

        let initilaizedRobots = [];

        for (let i = 0; i < robotsArray.length; i++) {
            initilaizedRobots.push( new Robot(robotsArray[i].coordinates, robotsArray[i].aiming, robotsArray[i].movements));
        }

        return initilaizedRobots;
    }



}