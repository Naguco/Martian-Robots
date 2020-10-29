import { GameController } from './controllers/gameController.js';

export class Game {

    startGame( data ) {

        let dataConverted = convertData(data);
        
        let gameController = new GameController(dataConverted.boardCoordinates, dataConverted.robots);

    }

    convertData(data) {

        let dataConverted = {};

        let separatedLines = data.split(/\r?\n/);
        separatedLines[0].split(/\s+/);

        dataConverted.boardCoordinates = this.convertBoardCoordinates(separatedLines[0]);
        separatedLines.shift();
        dataConverted.robots = this.convertRobots(separatedLines);

        return dataConverted;

    }

    convertBoardCoordinates(firstLine) {
        let array = firstLine.split(/\s+/);
        array[0] = parseInt(array[0]);
        array[1] = parseInt(array[1]);
        return array;
    }

    convertRobots(restLines) {

        let array = [];

        if (restLines.length % 2 == 0) {
            for (let i = 0; i < restLines.length; i = i + 2) {
                let splittedCoordinates = restLines[i].split(/\s+/);
                let robotAiming =  splittedCoordinates[2];
                let robotCoordinates = [parseInt(splittedCoordinates[0]), parseInt(splittedCoordinates[1])];
                array.push(new Object({
                    coordinates: robotCoordinates,
                    aiming: robotAiming,
                    movements: restLines[i+1]
                }));
            }

            return array;
        } else {
            // Lanzar error de que no se han introducido el par de [PosicionInicial + Donde apunta, MovimientosDelRobot] correctamente.
        }
    }

}
