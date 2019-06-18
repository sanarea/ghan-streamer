require('dotenv-safe').config();
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);;
const mjpeg = require('./routes/mjpeg');
app.use('/', express.static('www'));
app.use('/mjpeg', mjpeg);
const PORT = process.env.PORT ? process.env.PORT : 3000;
server.listen(PORT);

console.log(`SERVER RUN ${PORT}`);