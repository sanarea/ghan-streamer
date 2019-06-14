#!/bin/bash
 ffmpeg -f avfoundation -framerate 25 -video_size 640x480 -i "0"  \
    -vcodec libx264 \
    -profile:v main \
    -g 25 \
    -r 25 -b:v 500k -keyint_min 250 \
    -strict experimental -pix_fmt yuv420p \
    -movflags empty_moov+default_base_moof \
    -an -preset ultrafast \
    -f mpjpeg   \
    - \
   |nc -l -k -v 2222
