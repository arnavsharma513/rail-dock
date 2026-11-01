function errorHandler(err, req, res, next) {
    
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        error: message
    });
} 

function notFoundHandler(req, res, next) {
    res.status(404).json({
        error: "Route not found"
    });
}

module.exports = {
    errorHandler,
    notFoundHandler
};