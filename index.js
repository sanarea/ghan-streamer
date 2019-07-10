require('dotenv-safe').config();
const express = require('express');
const app = express();
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const server = http.createServer(app);
const FFPipe = require('./service/ffpipe');
const router = express.Router();
const pipe = new FFPipe();

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});


const route = require('./routes/streamer');

app.use('/', express.static('www'));
app.use('/streamer', route);
app.all('/carez/version', (req,res) => {
    res.send({
        version: 1.0,
        url: '/streamer'
    });
    
});
app.pipe = pipe;
const PORT = process.env.PORT ? process.env.PORT : 3000;
server.listen(PORT);
console.log(`================`);
console.log(`MEDIA_SERVER RUN ${PORT}`);