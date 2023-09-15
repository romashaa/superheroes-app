import Superhero from "./Superhero.js";

class SuperheroService {
    async create (superhero, picture) {
        return await Superhero.create(superhero);
    }

    async getAll () {
        const superheroes = await Superhero.find();
        return superheroes;
    }
    async getOne (id) {
            if(!id){
                throw new Error("Id wasn't specified");
            }
            const superhero = await Superhero.findById(id);
            return superhero;
    }
    async edit (superhero) {
        if(!superhero._id){
            throw new Error("Id wasn't specified");
        }
        const updatedSuperhero = await Superhero.findByIdAndUpdate(superhero._id, superhero, {new: true});
        return updatedSuperhero;
    }
    async delete (id) {
        if(!id){
            throw new Error("Id wasn't specified");
        }
        const superhero = await Superhero.findByIdAndDelete(id);
        return superhero;
    }
}

export default new SuperheroService();