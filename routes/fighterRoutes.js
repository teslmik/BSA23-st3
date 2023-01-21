import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import { createFighterValid, updateFighterValid } from "../middlewares/fighter.validation.middleware.js";

const router = Router();

// TODO: Implement route controllers for fighter
// ------------------CREATE----------------------
router.post('/', createFighterValid, (req, res, next) => {
  try {
    if (!res.errors) {
      res.data = fighterService.create(req.body);
    }
  } catch (error) {
    res.errors = "400";
    res.message = error.message;
  } finally {
    next();
  }
}, responseMiddleware);

// ---------------UPDATE----------------
router.put('/:id', updateFighterValid, (req, res, next) => {
  try {
    if (!res.errors) {
      res.data = fighterService.update(req.params.id, req.body);
    }
  } catch (error) {
    res.errors = "404";
    res.message = error.message;
  } finally {
    next();
  }
}, responseMiddleware);

// ---------------------GET_ALL-----------------------
router.get('/', (_, res, next) => {
  try {
    res.data = fighterService.getAll();
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
    res.data = fighterService.getOne(req.params.id);
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
    res.data = fighterService.delete(req.params.id);
  } catch (error) {
    res.errors = "404";
    res.message = error.message;
  } finally {
    next();
  }
}, responseMiddleware);




export { router };
