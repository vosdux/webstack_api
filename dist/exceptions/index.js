"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(status, message, errors) {
        super(message);
        this.status = status;
        this.errors = errors;
    }
}
exports.default = ApiError;
ApiError.UnauthorizedError = () => {
    return new ApiError(401, 'Пользователь не авторизован', []);
};
ApiError.BadRequest = (message, errors) => {
    return new ApiError(400, message, errors);
};
