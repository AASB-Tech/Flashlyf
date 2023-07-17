# Allow to control accepted files format
ACCEPTED_IMAGE_FORMATS = [
                            "image/gif", "image/jpeg",
                            "image/jpg", "image/png", "image/webp"
                        ]
ACCEPTED_VIDEO_FORMATS = ["video/mp4", "video/webm"]
ACCEPTED_AUDIO_FORMATS = ["audio/mpeg", "audio/ogg", "audio/mp3"]

# * = wildcard (should be matched for UUID patterns)
# TODO: Change this to correct directory dir
ALLOWED_MEDIA_PATHS = [
    "users/*/",
    "users/*/albums/*/",
    "users/*/comments/",
]
