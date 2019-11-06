import express, { RequestHandler, Response } from 'express'

const app :express.Application = express();

app.get('/', (req, res) => {
    res.send("Hellow world!");
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000');
})