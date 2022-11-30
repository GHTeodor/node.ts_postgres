export const constant = {
    AUTHORIZATION: 'Authorization',

    EMAIL_REGEXP: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,

    PHOTO_MAX_SIZE: 2 * 1024 * 1024, // 2 Mb
    VIDEO_MAX_SIZE: 20 * 1024 * 1024, // 20 Mb

    PHOTOS_MIMETYPES: [
        'image/gif', // .gif
        'image/jpeg', // .jpg, .jpeg
        'image/pjpeg', // .jpeg
        'image/png', // .png
        'image/webp', // .webp
    ],
    VIDEOS_MIMETYPES: [
        'video/mp4', // .mp4
        'video/x-msvideo', // .avi
    ],
};
