const spawn = require('child_process').spawn;
let param = require('./env/ffmpeg');
const {
    Writable
} = require('stream');

class pipe {
    constructor() {}
    ffmpeg() {
        var ffmpeg = require('child_process').spawn("ffmpeg", param);
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

        res.set('Content-Type', 'multipart/x-mixed-replace;boundary=ffmpeg');
        // res.write('--ffmpeg_streamer\r\n');
        // console.log("Xxx");
        let ffmpeg = this.ffmpeg();
        res.ffmpeg = ffmpeg;
        let cnt = 0;
        ffmpeg.stdout.on('data', (data) => {

            if (cnt++ % 500 == 0) {
                console.log(`data:${data.length} ${cnt}`);
            }
            // console.log(res);
            try {
                res.write(data);
            } catch (error) {

            }
            // writable.write(data, {
            //     end: true
            // })

        });
        ffmpeg.on('exit', (code, signal) => {
            console.log('exit', code, signal);
            try {
                if (ffmpeg.res) {
                    ffmpeg.res.end();
                }
            } catch (error) {
                console.log(error);
            }

        });
        req.ffmpeg = ffmpeg;
        req.connection.on('close', function () {
            // code to handle connection abort
            req.ffmpeg.kill();
            console.log('user cancelled');
        });
        res.on("end", () => {
            console.log("end...");
            res.ffmpeg.kill();
        });
        // res.end();
    }
}

module.exports = new pipe();