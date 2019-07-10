var express = require('express');
var router = express.Router();

router.use('/', (req, res) => {
  res.app.pipe.push(res);

});
router.use('/', (req, res) => {
  res.app.pipe.push(res);

});
module.exports = router;
