require('./serverConfig.js');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', require('./routes/routes.js'));

app.listen(process.env.PORT, () => { console.log('Escuchando puerto: ', process.env.PORT); });
