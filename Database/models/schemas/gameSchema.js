// This file contains the game schema to save in the mongoDB database.
const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let gameSchema = new Schema({
    input: {
        type: String,
        required: true
    },
    output: {
        type: String,
        required: true
    },
    relevantInformation: {
        type: Object
    }
});

module.exports = mongoose.model('Game', gameSchema);