"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logger_1 = require("../utils/logger");
const errorHandler = (error, req, res, next) => {
    const { statusCode = 500, message, stack } = error;
    logger_1.logger.error(`Error ${statusCode}: ${message}`, {
        url: req.url,
        method: req.method,
        ip: req.ip,
        userAgent: req.get("user-agent"),
        stack: process.env.NODE_ENV === "development" ? stack : undefined,
    });
    const response = {
        success: false,
        error: {
            message: statusCode === 500 ? "Internal Server Error" : message,
            ...(process.env.NODE_ENV === "development" && { stack }),
        },
    };
    res.status(statusCode).json(response);
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map