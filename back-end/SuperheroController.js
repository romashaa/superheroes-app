import Superhero from "./Superhero.js";
import SuperheroService from "./SuperheroService.js";

class SuperheroController {
    async create (req, res) {
        try {
            const superhero = await SuperheroService.create(req.body, req.files)
            res.json(superhero);
        } catch (e){
            res.status(500).json(e.message);
        }
    }

    async getAll (req, res) {
        try{
            const superheroes = await SuperheroService.getAll();
            return res.json(superheroes);
        } catch (e){
            res.status(500).json(e);
        }
    }
    async getOne (req, res) {
        try{
            const superhero = await SuperheroService.getOne(req.params.id);
            return res.json(superhero);
        } catch (e){
            res.status(500).json(e);
        }
    }
    async edit (req, res) {
        try{
            console.log(req.body._id)
            console.log(req.body.nickname)
            const updatedSuperhero = await SuperheroService.edit(req.body);
            return res.json(updatedSuperhero);
        } catch (e){
            res.status(500).json(e.message);
        }
    }
    async delete (req, res) {
        try{
            const superhero = await SuperheroService.delete(req.params.id);
            return res.json(superhero);
        } catch (e){
            res.status(500).json(e);
        }
    }
}

export default new SuperheroController();