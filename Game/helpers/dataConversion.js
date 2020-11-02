
/**
 * Parse string input to JSON object.
 * @param {string} data Input data.
 * @returns {Object} Parsed data.
*/
module.exports = function convertData(data) {
    let dataConverted = {};

    let separatedLines = data.split(/\r?\n/);
    separatedLines[0].split(/\s+/);

    dataConverted.boardCoordinates = convertBoardCoordinates(separatedLines[0]);
    separatedLines.shift();
    dataConverted.robots = convertRobots(separatedLines);

    return dataConverted;
};

/**
 * Function that converst first line of data input to a pair of coordinates array.
 * @param {string} firstLine String that contains two numbers in string format.
 * @returns {Array<number>} Pair of corrdinates.
*/
function convertBoardCoordinates(firstLine) {
    let array = firstLine.split(/\s+/);
    array[0] = parseInt(array[0]);
    array[1] = parseInt(array[1]);
    return array;
}

/**
 * Function that convert robots information from string to an object array.
 * @param {string} restLines Rest of the lines of the data input.
 * @returns {Array<Object>} returns the robots parsed to json object.
*/
function convertRobots(restLines) {
    let array = [];

    if (restLines.length % 2 == 0) {
        for (let i = 0; i < restLines.length; i = i + 2) {
            let splittedCoordinates = restLines[i].split(/\s+/);
            let robotAiming =  splittedCoordinates[2];
            let robotCoordinates = [parseInt(splittedCoordinates[0]), parseInt(splittedCoordinates[1])];
            array.push(new Object({
                coordinates: robotCoordinates,
                aiming: robotAiming,
                movements: restLines[i+1].split("")
            }));
        }

        return array;
    }
}