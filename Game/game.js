import { GameController } from './controllers/gameController.js';
import { convertData } from './helpers/dataConversion.js';

export class Game {

    startGame( data ) {
        let dataConverted = convertData(data);
        let gameController = new GameController(dataConverted.boardCoordinates, dataConverted.robots);
        gameController.start();
    }

}
