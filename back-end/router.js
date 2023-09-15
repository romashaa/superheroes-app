import {Router} from "express";
import Superhero from "./Superhero.js";
import SuperheroController from "./SuperheroController.js";

const router = new Router();

router.post('/superheroes', SuperheroController.create)
router.get('/superheroes', SuperheroController.getAll)
router.get('/superheroes/:id', SuperheroController.getOne)
router.put('/superheroes', SuperheroController.edit)
router.delete('/superheroes/:id', SuperheroController.delete)
export default router;