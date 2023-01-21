import { userRepository } from "../repositories/userRepository.js";

class UserService {
  // TODO: Implement methods to work with user

  create(data) {
    const { email, phoneNumber, ...userData } = data;

    if (this.search({ email: email.toLowerCase() }) || this.search({ phoneNumber })) {
      throw new Error("Email or phone number is already exist");
    }

    const user = userRepository.create({ email: email.toLowerCase(), phoneNumber, ...userData });

    return user;
  }

  update(id, data) {
    const { email, phoneNumber, ...userData } = data;

    if (!this.search({ id })) throw new Error("User not found");
    if (this.search({ email: email.toLowerCase() }) || this.search({ phoneNumber })) {
      throw new Error("Email or phone number is already exist");
    }

    const user = userRepository.update(id, data);

    if (!user) throw new Error("Can not update user");

    return user;
  }

  getAll() {
    const users = userRepository.getAll();
    if (users.length === 0) throw new Error("Can not find any user");
    return users;
  }

  getOne(id) {
    const user = userRepository.getOne({ id });
    if (!user) throw new Error("User not found");
    return user;
  }

  delete(id) {
    const user = userRepository.delete(id);
    if (!user || user.length === 0) throw new Error("User not found");
    return user;
  }

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

const userService = new UserService();

export { userService };
