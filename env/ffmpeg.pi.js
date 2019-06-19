
var params = [
    '-framerate', 25, // 없으면 자동으로 설정됨...
    '-video_size', "1280x720", // 이미지 품질
    // '-c', 'copy',
    // '-format',
    '-f', 'v4l2',
    '-i', '/dev/video0',
    // '-profile:v', ' main',
    // '-g', '25', //
    // '-r', '25', //
    //'-tune','zerolatency', // not support pi
    '-b:v', '500k',
    // '-threads', 2,
    '-q:v', '9', //품질... 1..2
    // "-preset",
    // "ultrafast",
    // '-pix_fmt', 'yuyv422p',
    '-strict', 'experimental',
    "-f",
    "mpjpeg",
    "pipe:1"
];

module.exports = params;