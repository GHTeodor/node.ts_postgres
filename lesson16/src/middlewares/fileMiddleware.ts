import { Request, Response, NextFunction } from 'express';
import { UploadedFile } from 'express-fileupload';

import { constant } from '../configs';
import { ErrorHandler } from '../errors';

class FileMiddleware {
    async checkUserAvatar(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.files?.avatar) {
                next();
                return;
            }

            const { name, size, mimetype } = req.files.avatar as UploadedFile;

            if (size > constant.PHOTO_MAX_SIZE) {
                next(new ErrorHandler(`File ${name} is too big`));
                return;
            }

            if (!constant.PHOTOS_MIMETYPES.includes(mimetype)) {
                next(new ErrorHandler('Wrong file format'));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const fileMiddleware = new FileMiddleware();
