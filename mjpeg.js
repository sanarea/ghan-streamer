const spawn = require('child_process').spawn;
var params = [
    ' -f', 'avfoundation',
    '-framerate', '25',
    '-video_size', '640x480',
    '-i', '"0"',
    '-vcodec', ' libx264',
    '-profile:v', ' main',
    '-g', '25',
    '-r', '25 ',
    '-b:v', '500k ',
    '-keyint_min', '250',
    '-strict', ' experimental',
    '-pix_fmt', ' yuv420p',
    '-movflags', 'empty_moov+default_base_moof',
    '-an -preset', 'ultrafast',
    '-f mpjpeg ',
    "pipe:1"

];

class mjpeg {
    ffmpeg() {
        const ffmpeg = spawn('ffmpeg', params, {
            stdio: ['ignore', 'pipe', 'ignore']
        });
        ffmpeg.on('error', (error) => {
            console.log(error);
        });

        ffmpeg.on('exit', (code, signal) => {
            console.log('exit', code, signal);
        });

        return ffmpeg;
    }
    async test() {
        // var ffmpeg = require('child_process').spawn("iostat", [
        //     "1",

        // ]);
        var ffmpeg = require('child_process').spawn("ffmpeg", [
            '-framerate', '25',
            '-video_size', '640x480',
            '-f', 'avfoundation',
            '-i', '0',
            "-preset",
            "ultrafast",
            "-f",
            "mpjpeg",
            "pipe:1"
        ]);
        let cnt =0;
        ffmpeg.on('error', (error) => {
            console.log(error);
        });
        ffmpeg.stderr.on('data', (data) => {

            // console.log('error', `${data}`);
        });
        ffmpeg.stdout.on('data', (data) => {
            console.log(`data:${data.length}`); 
            // console.log(`${cnt} : ${data}`);
            // if(cnt++>20){
            //     process.exit(0);
            // }
        });
        ffmpeg.on('exit', (code, signal) => {
            console.log('exit', code, signal);
        });
        return ffmpeg;
    }
    pipe(req, res) {
        console.log("Xxx");


        res.end();
    }
}

module.exports = new mjpeg();