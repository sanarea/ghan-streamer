const spawn = require('child_process').spawn;
const {
    Writable
} = require('stream')
var params1 = [
    ' -f', 'avfoundation',
    '-i', '0',
    '-framerate', '30',
    '-video_size', '640x480',

    // '-vcodec', ' libx264',
    // '-profile:v', ' main',
    // '-g', '25',
    // '-r', '25 ',
    // '-b:v', '500k ',
    // '-keyint_min', '250',
    // '-strict', 'experimental',
    // '-pix_fmt', ' yuv420p',
    // '-movflags', 'empty_moov+default_base_moof',
    // '-an ',
    '-preset', 'ultrafast',
    '-f', 'mpjpeg',
    "pipe:1"
];
var params = [
    // '-framerate', '25', // 없으면 자동으로 설정됨...
    '-video_size', process.env.VIDEO_SIZE, // 이미지 품질
    // '-c', 'copy',
    // '-format',
    '-f', process.env.INPUT_DRIVER,
    '-i', process.env.INPUT_DEVICE,
    // '-profile:v', ' main',
    '-g', '25', //
    '-r', '25', //
    //'-tune','zerolatency', // not support pi
    '-b:v', '500k',
    '-threads', 2,
    '-q:v', '9', //품질... 1..2
    // "-preset",
    // "ultrafast",
    // '-pix_fmt', 'yuyv422p',
    '-strict', 'experimental',
    "-f",
    "mpjpeg",
    "pipe:1"
];
class mjpeg {

    async ffmpeg() {

        // var ffmpeg = require('child_process').spawn("ffmpeg", [
        //     '-framerate', '25',
        //     '-video_size', '640x480',
        //     '-f', 'avfoundation',
        //     '-i', '0',
        //     "-preset",
        //     "ultrafast",
        //     "-f",
        //     "mpjpeg",
        //     "pipe:1"
        // ]);
        var ffmpeg = require('child_process').spawn("ffmpeg", params);
        let cnt = 0;
        ffmpeg.on('error', (error) => {
            console.log(error);
        });
        ffmpeg.stderr.on('data', (data) => {

            console.log('error', `${data}`);
        });

      
        return ffmpeg;
    }
    async pipe(req, res) {
        const writable = new Writable({
            write(chunk, encoding, callback) {
                res.write(chunk);
                // res.write(`Content-Type: image/jpeg\r\nContent-Length: ${chunk.length}\r\n\r\n`);
                // res.write(chunk);
                // res.write('\r\n--ffmpeg_streamer\r\n');
                // callback();
            }
        })
        res.set('Content-Type', 'multipart/x-mixed-replace;boundary=ffmpeg');
        // res.write('--ffmpeg_streamer\r\n');
        // console.log("Xxx");
        let ffmpeg = await this.ffmpeg();
        res.ffmpeg = ffmpeg;
        let cnt = 0;
        ffmpeg.stdout.on('data', (data) => {

            if (cnt++ % 100 == 0) {
                console.log(`data:${data.length} ${cnt}`);
            }
            // console.log(res);
            res.write(data);
            // writable.write(data, {
            //     end: true
            // })

        });
        ffmpeg.on('exit', (code, signal) => {
            console.log('exit', code, signal);
            ffmpeg.res.end();
        });
        req.ffmpeg = ffmpeg;
        req.connection.on('close', function () {
            // code to handle connection abort
            req.ffmpeg.kill();
            console.log('user cancelled');
        });
        req.on("end", (data) => {
            console.log("req end");
        });
        res.on("end", (data) => {
            console.log("end...");
            res.ffmpeg.kill();
        });
        // res.end();
    }
}

module.exports = new mjpeg();