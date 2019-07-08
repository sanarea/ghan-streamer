let V4L2 = require('../v4l2');
let v4l2 = new V4L2();


(async () => {
    await v4l2.start();
})();