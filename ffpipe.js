const spawn = require('child_process').spawn;
let param = require('./env/ffmpeg');
var uuid = require('node-uuid');
const EventEmitter = require('events');

class FFPipe extends EventEmitter {
    constructor() {
        super();
        this.store = [];
    }
    async start() {
        this.ffmpeg = spawn("ffmpeg", param);
        this.ffmpeg.on('error', (error) => {
            // console.error(error);
        });
        this.ffmpeg.stderr.on('data', (data) => {
            // console.error('data', `${data}`);
        });
        this.ffmpeg.on('exit', (code, signal) => {
            console.log('ffmpeg exit', code, signal);
            this.emit('exit', code, signal);
            this.ffmpeg = undefined;
        });
        let cnt = 0;
        this.ffmpeg.stdout.on('data', (data) => {
            if (cnt++ % 100 == 0) {
                let keys = Object.keys(this.store);
                console.log(`still : client: ${keys.length} ,${data.length} ${cnt}`);

            }
            let keys = Object.keys(this.store);
            if (!keys || keys.length < 1) {
                return;
            }

            for (let i = 0; i < keys.length; i++) {
                this.writeData(this.store[keys[i]], data);
            }

        });
    }
    async writeData(res, data) {
        if (res.writable)
            res.write(data);

    }

    push(res) {
        res.uuid = uuid.v1();

        res.set('Connection', 'close');
        res.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.set('Expires', '-1');
        res.set('Pragma', 'no-cache');
        res.set('Content-Type', 'multipart/x-mixed-replace;boundary=ffmpeg');
        res.connection.on("close", (data) => {
            console.log("connection closed...", data);
            this.remove(res);
        });
        this.store[res.uuid] = res;
        if (!this.ffmpeg || this.ffmpeg === undefined) {
            this.start();
        }

    }
    remove(res) {
        delete this.store[res.uuid];
    }



}

module.exports = FFPipe;