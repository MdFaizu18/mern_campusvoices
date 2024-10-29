// errorMiddleware.js

export const errorHandler = (err, req, res, next) => {
    // If the error is an UnauthenticatedError
    if (err instanceof UnauthenticatedError) {
        return res.status(401).json({ error: 'Authentication invalid' });
    }
    // If the error is an UnauthorizedError
    if (err instanceof UnauthorizedError) {
        return res.status(403).json({ error: 'Unauthorized' });
    }
    // Handle other errors
    return res.status(500).json({ error: 'Internal Server Error' });
};


