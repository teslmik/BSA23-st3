import { FIGHTER } from "../models/fighter.js";

const { id, ...fighterData } = FIGHTER;

const createFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during creation
  let errorsMessage = validation(req.body, deepEqual(isHealthProp(req.body), fighterData));

  if (errorsMessage.length !== 0) {
    res.errors = '400';
    res.message = errorsMessage;
  }

  next();
};

const updateFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during update
  const checkHasProp = () => {
    for (let prop in req.body) {
      if (!fighterData.hasOwnProperty(prop)) {
        return false;
      }
    }
    return true;
  }

  let errorsMessage = validation(req.body, checkHasProp());

  if (Object.keys(req.body).length === 0) {
    errorsMessage += "No data to update \n";
  }
  if (errorsMessage.length !== 0) {
    res.errors = "400";
    res.message = errorsMessage;
  }
  next();
};

const validationName = (name) => {
  return isNaN(name);
};

const validationPower = (power) => {
  return (typeof power == "number" && Number.isInteger(power) && power <= 100 && power >= 1);
};

const validationDefense = (defense) => {
  return (typeof defense == "number" && Number.isInteger(defense) && defense <= 10 && defense >= 1);
};

const validationHealth = (health) => {
  return health ? (typeof health == "number" && Number.isInteger(health) && health <= 120 && health >= 80) : null;
};

const validation = (newFighter, funcBoolean = false) => {
  let errorsMessage = "";

  if (!funcBoolean) {
    errorsMessage += `Wrong properties. \n`;
  }

  Object.keys(newFighter).forEach((item) => {
    if (item === "name" && !validationName(newFighter[item])) {
      errorsMessage += `Invalid name. \n`;
    } else if (item === "power" && !validationPower(newFighter[item])) {
      errorsMessage += `Invalid power. Value must be between 1 and 100. \n`;
    } else if (item === "defense" && !validationDefense(newFighter[item])) {
      errorsMessage += `Invalid defense. Value must be between 1 and 10. \n`;
    } else if (item === "health" && !validationHealth(newFighter[item])) {
      errorsMessage += `Invalid health. Value must be between 80 and 120. \n`;
    }
  });

  return errorsMessage;
};

function isHealthProp(obj) {
  if (!obj.hasOwnProperty('health')) {
    obj.health = 100;
  }
  return obj;
}

function deepEqual(obj1, obj2) {
  if (Object.keys(obj1).length != Object.keys(obj2).length) {
    return false;
  }
  for (let propName in obj1) {
    if (!obj2.hasOwnProperty(propName)) {
      return false;
    }
  }

  return true;
};

export { createFighterValid, updateFighterValid };
