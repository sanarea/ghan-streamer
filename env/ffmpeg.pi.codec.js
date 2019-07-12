
let param_input = [
    '-video_size', "1280x720",
    '-r', 15,
    '-f', 'v4l2',
    '-input_format', 'mjpeg',
    // '-i', '/dev/video0',
   
];
let param_output = [
    '-c:v', 'copy', // 순서가 중요하다...
    "-b:v" , '20k',
    "-f",   "mpjpeg",
    "pipe:1"
];
module.exports = {
    param_input: param_input,
    param_output: param_output
};