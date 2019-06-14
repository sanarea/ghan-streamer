const spawn = require('child_process').spawn;
var param = [
    '-re',
    '-f', 'avfoundation',
    '-i', "0",
    
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

    pipe(req, res) {
        console.log("Xxx");


        res.end();
    }
}

module.exports = new mjpeg();