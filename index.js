require('dotenv-safe').config();
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);;
const mjpeg = require('./routes/mjpeg');
app.use('/', express.static('www'));
app.use('/mjpeg', mjpeg);

server.listen(3000);