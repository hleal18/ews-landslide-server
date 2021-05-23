import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import passport from 'passport';

require('./config/mongoose');
require('./async-controllers');
require('./config/passport');


const app: express.Application = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

import Routes from "./routes";
app.use('/api', Routes);

app.get('/', (req, res) => {
    res.send("Hellow world!");
});

const serverPort = 3002;
app.listen(serverPort, function () {
    console.log(`Example app listening on port ${serverPort}`);
});
