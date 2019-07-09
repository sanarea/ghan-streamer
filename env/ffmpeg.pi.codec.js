var params = [
    '-video_size', "1280x720", 
    '-r', 15,
    '-f', 'v4l2',
    '-input_format', 'mjpeg',
    '-i', '/dev/video0',
    '-c:v', 'copy', // 순서가 중요하다...
    "-f",
    "mpjpeg",
    "pipe:1"
];

module.exports = params;