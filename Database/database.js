const mongoose = require('mongoose');
const DatabaseConfig = require('./databaseConfig');

/**
 * Function that starts the mongoose instance
 * @returns {boolean} True if connected.
 */
module.exports = async function startDatabaseInstance() {

    console.log("Trying to connect to database, please wait.");

    let connected = false;
    await mongoose.connect(DatabaseConfig.publicMongoDBInstance, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => { connected = true; console.log("Connected!"); })
        .catch(() => { connected = false; });
    return connected;

};