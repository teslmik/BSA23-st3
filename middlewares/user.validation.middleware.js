import { USER } from "../models/user.js";


const { id, ...userData } = USER;

const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for USER entity during creation
  let errorsMessage = validation(req.body, deepEqual(req.body, userData));

  if (errorsMessage.length !== 0) {
    res.errors = '400';
    res.message = errorsMessage;
  }

  next();
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update
  const propArr = [];

  for (let prop in req.body) {
    if (req.body.hasOwnProperty(prop)) {
      propArr.push(prop);
    }
  }

  const checkHasProp = propArr.some((elem) => {
    for (let prop in userData) {
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

const validationEmail = (email) => {
  return email && email.match(/^\w+([\.-]?\w+)*@gmail.com/);
};

const validationPhone = (phoneNumber) => {
  return phoneNumber && phoneNumber.match(/\+380[0-9]{9}$/);
};

const validationPassword = (password) => {
  return password && password.length >= 3;
};

const validationLastName = (lastName) => {
  return isNaN(lastName);
};

const validationFirstName = (firstName) => {
  return isNaN(firstName);
};

const validation = (newUser, funcBoolean = false) => {
  let errorsMessage = "";

  if (!funcBoolean) {
    errorsMessage += `Wrong properties. \n`;
  }

  Object.keys(newUser).forEach((item) => {
    if (item === "firstName" && !validationFirstName(newUser[item])) {
      errorsMessage += `Invalid first name. \n`;
    } else if (item === "lastName" && !validationLastName(newUser[item])) {
      errorsMessage += `Invalid last name. \n`;
    } else if (item === "email" && !validationEmail(newUser[item])) {
      errorsMessage += `Invalid email. \n`;
    } else if (item === "phoneNumber" && !validationPhone(newUser[item])) {
      errorsMessage += `Invalid number format. \n`;
    } else if (item === "password" && !validationPassword(newUser[item])) {
      errorsMessage += `Password must be min 3 characters. \n`;
    }
  });

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

export { createUserValid, updateUserValid };
