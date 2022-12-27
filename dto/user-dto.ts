import { UserInstance } from "../models/user-model";

class UserDto {
  email: string;
  id: string;
  role: string;
  isActivated: boolean

  constructor(user: UserInstance) {
    this.email = user.email;
    this.role = user.role;
    this.id = user.id;
    this.isActivated = user.isActivated;
  }
}

export default UserDto;