import { userRepository } from "../repositories/userRepository.js";

class UserService {
  // TODO: Implement methods to work with user

  create(data) {
    const { email, phoneNumber } = data;

    if (this.search({ email }) || this.search({ phoneNumber })) {
      throw new Error("Email or phone number is already registered");
    }

    const user = userRepository.create(data);

    return user;
  }

  update(id, data) {

    if (!this.search({ id })) throw new Error("User not found");
    if (this.search({ email: data?.email }) || this.search({ phoneNumber: data?.phoneNumber })) {
      throw new Error("Email or phone number is already registered");
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
    console.log('user: ', user);
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
