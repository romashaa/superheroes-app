import Superhero from "./Superhero.js";


class SuperheroService {
    async create(superheroData, images) {
        try {
            const imagePaths = images.map((image) => image.path);
            superheroData.images = imagePaths;
            const superhero = await Superhero.create(superheroData);
            return superhero;
        } catch (error) {
            throw new Error(error.message);
        }
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

    async edit(superheroId, updatedFields, images) {
        const imagePaths = images.map((image) => image.path);
        updatedFields.images = imagePaths;
        const updatedSuperhero = await Superhero.findByIdAndUpdate(
            superheroId,
            updatedFields,
            { new: true, runValidators: true }
        );
        console.log(updatedSuperhero);
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