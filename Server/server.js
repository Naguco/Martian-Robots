/**
 * Function that starts express server instance for listen in port 3000.
*/
module.exports = function startServer() {

    require('./serverConfig.js');

    const express = require('express');
    const cors = require('cors');
    const bodyParser = require('body-parser');

    const app = express();

    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use('', require('./routes/routes.js'));

    app.listen(process.env.PORT, () => { console.log('Escuchando puerto: ', process.env.PORT); });


};
