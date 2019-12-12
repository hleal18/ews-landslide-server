import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Routes from "./routes";

require('./config/mongoose');
require('./async-controllers');

const app: express.Application = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', Routes);

app.get('/', (req, res) => {
    res.send("Hellow world!");
});

app.listen(3001, function () {
    console.log('Example app listening on port 3001');
});