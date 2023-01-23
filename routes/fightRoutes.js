import { Router } from "express";
import { fightService } from "../services/fightService.js";
import { createFightValid, updateFightValid } from "../middlewares/fight.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

// OPTIONAL TODO: Implement route controller for fights

router.post('/', createFightValid, (req, res, next) => {
  try {
    if (!res.errors) {
      res.data = fightService.create(req.body);
    }
  } catch (error) {
    res.errors = "400";
    res.message = error.message;
  } finally {
    next();
  }
}, responseMiddleware);

// ---------------UPDATE----------------
router.put('/:id', updateFightValid, (req, res, next) => {
  try {
    if (!res.errors) {
      res.data = fightService.update(req.params.id, req.body);
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
    res.data = fightService.getAll();
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
    res.data = fightService.getOne(req.params.id);
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
    res.data = fightService.delete(req.params.id);
  } catch (error) {
    res.errors = "404";
    res.message = error.message;
  } finally {
    next();
  }
}, responseMiddleware);

export { router };
