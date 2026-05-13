import AppError from "../utils/AppError.js"


const routeNotFound = (req,res,next) => {

    const error = new AppError(`Cannot find ${req.originalUrl}`,404);

    next(error);
}

const globalErrorMiddleware = (err,req,res,next) => {

    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
};

export default {globalErrorMiddleware,routeNotFound};