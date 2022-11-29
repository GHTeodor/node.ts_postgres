export class ErrorHandler extends Error {
    code: number;

    constructor(message: string, code: number = 400) {
        super(message);
        this.code = code;

        Error.captureStackTrace(this, this.constructor);
    }
}
