require('dotenv-safe').config();
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const FFPipe = require('./ffpipe');

const pipe = new FFPipe();

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
const route = require('./routes/mjpeg');
app.use('/', express.static('www'));
app.use('/mjpeg', route);
app.pipe = pipe;
const PORT = process.env.PORT ? process.env.PORT : 3000;
server.listen(PORT);

console.log(`MEDIA_SERVER RUN ${PORT}`);