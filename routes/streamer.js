var express = require('express');
var router = express.Router();

router.use('/', (req, res) => {
  res.app.pipe.push(res);

});
/**
 * /streamer/0 
 */
router.use('/:deviceId', (req, res) => {
  res.app.pipe.push(res);

});

module.exports = router;
