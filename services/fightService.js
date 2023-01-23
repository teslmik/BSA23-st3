import { fighterRepository } from "../repositories/fighterRepository.js";
import { fightRepository } from "../repositories/fightRepository.js";

class FightService {
  // OPTIONAL TODO: Implement methods to work with fights

  create(data) {
    const fighters = fighterRepository.getAll();

    const findFighterId = true
      ? (fighters.some((obj) => obj.id === data.fighter1) && fighters.some((obj) => obj.id === data.fighter2))
      : false;

    if (!findFighterId) throw new Error("One or both fighters not found");

    const fight = fightRepository.create(data);
    return fight;
  }

  update(id, data) {
    if (!this.search({ id })) throw new Error("Fight not found");

    const fight = fightRepository.update(id, data);

    return fight;
  }

  getAll() {
    const fight = fightRepository.getAll();
    return fight;
  }

  getOne(id) {
    const fight = fightRepository.getOne({ id });
    if (!fight) throw new Error("Fight not found");
    return fight;
  }

  delete(id) {
    const fight = fightRepository.delete(id);
    if (!fight || fight.length === 0) throw new Error("Fight not found");
    return fight;
  }

  search(search) {
    const item = fightRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

const fightService = new FightService();

export { fightService };
