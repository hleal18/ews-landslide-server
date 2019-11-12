import express from 'express';
import bodyParser from 'body-parser';
import Routes from "./routes";
require('./config/mongoose');

const app: express.Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', Routes);

app.get('/', (req, res) => {
    res.send("Hellow world!");
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000');
});