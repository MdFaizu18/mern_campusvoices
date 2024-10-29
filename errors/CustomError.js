import { StatusCodes } from 'http-status-codes';

// 200 OK                    --> OK
// 201 CREATED               --> Created
// 400 BAD_REQUEST           --> Bad Request
// 401 UNAUTHORIZED          --> Unauthorize
// 403 FORBIDDEN             --> Forbidden
// 404 NOT_FOUND             --> Not Found
// 500 INTERNAL_SERVER_ERROR --> Internal Server Error


export class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}
export class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = 'BadRequestError';
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}
export class UnauthenticatedError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UnauthenticatedError';
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}
export class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UnauthorizedError';
        this.statusCode = StatusCodes.FORBIDDEN;
    }
}