const spawn = require('child_process').spawn;
let param = require('./env/ffmpeg');
const {
    Writable
} = require('stream');

class mjpeg {
    constructor() {
    }
    async ffmpeg() {


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
            if(ffmpeg.res){ 
                ffmpeg.res.end();
            } 

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