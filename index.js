require('dotenv-safe').config();
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);


// var corsOptions = {
//     "origin": "*",
//     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//     "preflightContinue": false,
//     "optionsSuccessStatus": 204
// }
// app.use(cors(corsOptions));


app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
const mjpeg = require('./routes/mjpeg');
app.use('/', express.static('www'));
app.use('/mjpeg', mjpeg);
const PORT = process.env.PORT ? process.env.PORT : 3000;
server.listen(PORT);

console.log(`SERVER RUN ${PORT}`);