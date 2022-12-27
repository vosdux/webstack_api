"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserDto {
    constructor(user) {
        this.email = user.email;
        this.role = user.role;
        this.id = user.id;
        this.isActivated = user.isActivated;
    }
}
exports.default = UserDto;
