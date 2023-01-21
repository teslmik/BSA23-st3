import { userService } from "./userService.js";

class AuthService {
  login(userData) {
    const { password, email } = userData;

    const user = userService.search({ email: email.toLowerCase(), password });
    if (!user) {
      throw Error("User not found");
    }
    return user;
  }
}

const authService = new AuthService();

export { authService };
