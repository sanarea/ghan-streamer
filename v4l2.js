const {
    spawn,
    spawnSync,
    execSync,
    exec,
} = require('child_process');
// const execSync = require('child_process').execSync;
let {
    params,
    setput
} = require('./env/v4l2');
var fs = require('fs');
var uuid = require('node-uuid');
const EventEmitter = require('events');
const DEF_PARAM = [
    '-d', '/dev/video0',
    '--stream-mmap',
    '-p' , '15',
    '--stream-to' , '-'
];
let v_param = params ? params : DEF_PARAM;
const V4L2 = 'v4l2-ctl';
class V4l2 extends EventEmitter {
    constructor() {
        super();
        this.store = [];
    }
    async test() {

        let xx = await this.exec(['--list-device']).catch(error => {

            return error;
        });
        console.log(`RESULT :[[${xx.toString()}]]`);
    }
    async exec(params) {
        await execSync(`ls ${params.join(' ')}`).catch(error => {
            return error;
        });
    }
    async deviceList() {
        let string = await this.spawn(['--list-device']);
    }
    async start() {
        this.pipe = spawn("v4l2-ctl", v_param);
        this.pipe.on('error', (error) => {
            // console.error(error);
        });
        this.pipe.stderr.on('data', (data) => {
            // console.error('data', `${data}`);
        });
        this.pipe.on('exit', (code, signal) => {
            console.log('pipe exit', code, signal);
            this.emit('exit', code, signal);
            this.pipe = undefined;
        });
        let cnt = 0;
        this.pipe.stdout.on('data', (data) => {
            if (cnt++ % 100 == 0) {
                console.log(`still : client: ${keys.length} ,${data.length} ${cnt}`);
            }
            fs.writeFile(`tmp/${(cnt+'').padStart(5)}.jpg`);
        });
    }

}

module.exports = V4l2;