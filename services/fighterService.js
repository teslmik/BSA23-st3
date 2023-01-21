import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  // TODO: Implement methods to work with fighters
  create(data) {
    const fighters = this.getAll();

    fighters.map((obj) => {
      if (obj.name.toLowerCase() === data.name.toLowerCase()) {
        throw new Error("Fighter name is already exist");
      }
    });

    const fighter = fighterRepository.create(data);

    return fighter;
  }

  update(id, data) {
    const fighters = this.getAll();

    if (!this.search({ id })) throw new Error("Fighter not found");
    fighters.map((obj) => {
      if (obj.name.toLowerCase() === data.name.toLowerCase()) {
        throw new Error("Fighter name is already exist");
      }
    });

    const fighter = fighterRepository.update(id, data);

    if (!fighter) throw new Error("Can not update fighter");

    return fighter;
  }

  getAll() {
    const fighters = fighterRepository.getAll();
    return fighters;
  }

  getOne(id) {
    const fighter = fighterRepository.getOne({ id });
    if (!fighter) throw new Error("Fighter not found");
    return fighter;
  }

  delete(id) {
    const fighter = fighterRepository.delete(id);
    if (!fighter || fighter.length === 0) throw new Error("Fighter not found");
    return fighter;
  }

  search(search) {
    const item = fighterRepository.getOne(search);

    if (!item) {
      return null;
    }
    return item;
  }
}

const fighterService = new FighterService();

export { fighterService };
