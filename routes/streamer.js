var express = require('express');
var router = express.Router();
const req_merge = require('../lib/req_merge');
const {defaultId} = require('../env/ffmpeg');
router.use(req_merge());
/**
 * /streamer/0 
 */
router.use('/:deviceId', (req, res) => {
  res.app.pipe.push(res,req.params.deviceId); 
});

router.use('/', (req, res) => {
  console.log("#1" );
  let id = defaultId;
  if( req.data.id )
    id = req.data.id;
  
  res.app.pipe.push(res,id);

});
module.exports = router;
