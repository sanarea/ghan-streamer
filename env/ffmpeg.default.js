var params1 = [
    ' -f', 'avfoundation',
    '-i', '0',
    '-framerate', '30',
    '-video_size', '640x480',

    // '-vcodec', ' libx264',
    // '-profile:v', ' main',
    // '-g', '25',
    // '-r', '25 ',
    // '-b:v', '500k ',
    // '-keyint_min', '250',
    // '-strict', 'experimental',
    // '-pix_fmt', ' yuv420p',
    // '-movflags', 'empty_moov+default_base_moof',
    // '-an ',
    '-preset', 'ultrafast',
    '-f', 'mpjpeg',
    "pipe:1"
];

/**
  cvlc --no-audio v4l2:///dev/video0 \
    --v4l2-width 1920 \
    --v4l2-height 1080 \
    --v4l2-chroma MJPG \
    --v4l2-hflip 1 \
    --v4l2-vflip 1 \
    --sout '#standard{access=http{mime=multipart/x-mixed-replace;boundary=--7b3cc56e5f51db803f790dad720ed50a},mux=mpjpeg,dst=:8554/}' -I dummy
  
 */
var params = [
    '-framerate', process.env.FRAMTE_RATE, // 없으면 자동으로 설정됨...
    '-video_size', process.env.VIDEO_SIZE, // 이미지 품질
    // '-c', 'copy',
    // '-format',
    '-f', process.env.INPUT_DRIVER,
    '-i', process.env.INPUT_DEVICE,
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