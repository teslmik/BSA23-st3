import { FIGHT } from "../models/fight.js";


const { id, ...fightData } = FIGHT;

const createFightValid = (req, res, next) => {
  let errorsMessage = validation(req.body, deepEqual(req.body, fightData));

  if (errorsMessage.length !== 0) {
    res.errors = '400';
    res.message = errorsMessage;
  }

  next();
};

const updateFightValid = (req, res, next) => {
    const propArr = [];

    for (let prop in req.body) {
      if (req.body.hasOwnProperty(prop)) {
        propArr.push(prop);
      }
    }

    const checkHasProp = propArr.some((elem) => {
      for (let prop in fightData) {
        if (prop === elem) {
          return true
        }
      }
    });

    let errorsMessage = validation(req.body, checkHasProp);

    if (Object.keys(req.body).length === 0) {
      errorsMessage += "No data to update \n";
    }
    if (errorsMessage.length !== 0) {
      res.errors = "400";
      res.message = errorsMessage;
    }

  next();
};

const validationLog = (log) => {
  let errorsMessage = ``;

  const logObj = {
    "fighter1Shot": '',
    "fighter2Shot": '',
    "fighter1Health": '',
    "fighter2Health": ''
  };

  if (log?.length === 0 || log?.some(obj => Object.keys(obj).length === 0)) return errorsMessage += `Log cannot be empty. \n`;

  const checkLog = () => {
    let isChecked = true;
    log?.forEach((obj) => {
      for (let propName in obj) {
        if (!logObj.hasOwnProperty(propName)) {
          return isChecked = false;
        }
      }
    });
    return isChecked;
  }

  if (!checkLog()) {
    return errorsMessage += `Wrong log property \n`;
  }

  return errorsMessage;
}

const validation = (newFight, funcBoolean = false) => {
  let errorsMessage = "";

  if (!funcBoolean) {
    errorsMessage += `Wrong properties. \n`;
  }

  errorsMessage += validationLog(newFight.log);

  return errorsMessage;
};

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

export { createFightValid, updateFightValid };
