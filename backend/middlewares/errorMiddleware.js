class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        // Ensure the status code is within the valid range
        if (this.statusCode < 400 || this.statusCode >= 600) {
            this.statusCode = 500;
        }

        Error.captureStackTrace(this, this.constructor);
    }
}


   export const errorMiddleware =  (err,req, res, next) =>{
        err.message = err.message || "Internal Server Error";
        err.statusCode = err.statusCode || 500;
    if(err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(400, message);
    }
    if(err.name === "JsonWebTokenError") {
        const message = "Json Web Token is invalid. Try again!!!";
        err = new ErrorHandler(400, message);
    }
    if(err.name === "TokenExpiredError") {
        const message = "Json Web Token is expired. Try again!!!";
        err = new ErrorHandler(400, message);
    }
    if(err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(400, message);
    }
    const errorMessage = err.errors ? Object.values(err.errors).map(value => value.message).join(' ') : err.message;


return res.status(err.statusCode).json({
    success: false,
    message: errorMessage
});

    }

export default ErrorHandler;
