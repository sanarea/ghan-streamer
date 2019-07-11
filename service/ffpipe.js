const spawn = require('child_process').spawn;
let { param_input, param_output } = require('../env/ffmpeg');
var uuid = require('node-uuid');
const EventEmitter = require('events');

class FFPipe extends EventEmitter {
    constructor() {
        super();
        this.store = [];
        this.ffmpeg = {};
    }
    /**
     * ffmpeg 에 연결된 connection 을 종료 시킨다.
     */
    async disconnect(deviceId) {
        let keys = Object.keys(this.store);
        for(let i=0;i<keys.length ;i++){
            let res = this.store[keys[i]];
            console.log(res.deviceId , deviceId);
            if (res.deviceId==deviceId) {
                res.end();
            }
        }
        
    } 
    async start(id = 0) {

        let deviceParams = ["-i", id + ''];
        let n_param = param_input.concat(deviceParams).concat(param_output);
        // let n_param = deviceParams.concat(param);
        console.log(n_param.join(' '));

        this.ffmpeg[id] = spawn("ffmpeg", n_param);
        
        this.ffmpeg[id].on('error', (error) => {
            // console.error(error);
        });
        
        this.ffmpeg[id].stderr.on('data', (data) => {
            console.error('stderr data', `${data}`);
        });
        /**
         * exit
         */
        this.ffmpeg[id].on('exit', (code, signal) => {
            console.log('ffmpeg exit', code, signal);
            this.emit('exit', code, signal);
            this.disconnect(id);
            delete this.ffmpeg[id];

        });
        let cnt = 0;

        this.ffmpeg[id].stdout.on('data', (data) => {

            if (cnt++ % 500 == 0) {
                let keys = Object.keys(this.store);
                console.log(`still : client: ${keys.length} ,${data.length} ${cnt}`);
            }
            let keys = Object.keys(this.store);
            if (!keys || keys.length < 1) {
                return;
            }

            for (let i = 0; i < keys.length; i++) {
                if (this.store[keys[i]].deviceId === id) {
                    this.writeData(this.store[keys[i]], data);
                }
            }


        });
    }
    async writeData(res, data) {
        if (res.writable)
            res.write(data);

    }

    push(res, deviceId) {
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
        res.deviceId = deviceId;
        this.store[res.uuid] = res;
        if (!this.ffmpeg[deviceId] || this.ffmpeg[deviceId] === undefined) {
            this.start(deviceId);
        }

    }
    remove(res) {
        let id = res.deviceId;
        delete this.store[res.uuid];
        let keys = Object.keys(this.store);
        for (let i = 0; i < keys.length; i++) {
            let r = this.store[keys];
            if (r.deviceId == id)
                return;
        }
        let ff = this.ffmpeg[id];
        if(ff)
            ff.kill();

    }



}

module.exports = FFPipe;