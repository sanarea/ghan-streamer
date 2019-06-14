'use strict'

const express = require('express');
const router = express.Router();
const mjpeg = require('../mjpeg');
const {
  Writable
} = require('stream')

router.use('/', (req, res, next) => {
  // const app = req.app
  // const pipe2jpeg = app.get('pipe2jpeg')
  // if (!pipe2jpeg) {
  //   res.status(404).send('mjpeg not available')
  //   res.destroy()
  //   return
  // }
  // res.locals.pipe2jpeg = pipe2jpeg
  res.set('Connection', 'close')
  res.set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
  res.set('Expires', '-1')
  res.set('Pragma', 'no-cache')
  
  mjpeg.pipe(req, res);
  
})

router.get('/', (req, res) => {

})

router.get('/test.mjpg', (req, res) => {


})

module.exports = router