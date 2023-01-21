import { Router } from "express";
import { userService } from "../services/userService.js";
import { createUserValid, updateUserValid } from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

// TODO: Implement route controllers for user


// -----------CREATE------------------
router.post('/', createUserValid, (req, res, next) => {

  try {
    if (!res.errors) {
      res.data = userService.create(req.body);
    }
  } catch (error) {
    res.errors = "400";
    res.message = error.message;
  } finally {
    next();
  }
}, responseMiddleware);

// ---------------UPDATE----------------
router.put('/:id', updateUserValid, (req, res, next) => {
  try {
    if (!res.errors) {
      res.data = userService.update(req.params.id, req.body);
    }
  } catch (error) {
    res.errors = "400";
    res.message = error.message;
  } finally {
    next();
  }
}, responseMiddleware);

// ---------------------GET_ALL-----------------------
router.get('/', (_, res, next) => {
  try {
    res.data = userService.getAll();
  } catch (error) {
    res.errors = "404";
    res.message = error.message;
  } finally {
    next();
  }
}, responseMiddleware);

// ---------------------GET_ONE-----------------------
router.get('/:id', (req, res, next) => {
  try {
    res.data = userService.getOne(req.params.id);
  } catch (error) {
    res.errors = "404";
    res.message = error.message;
  } finally {
    next();
  }
}, responseMiddleware);

// ---------------------DELETE-----------------------
router.delete('/:id', (req, res, next) => {
  try {
    res.data = userService.delete(req.params.id);
  } catch (error) {
    res.errors = "404";
    res.message = error.message;
  } finally {
    next();
  }
}, responseMiddleware);

export { router };
