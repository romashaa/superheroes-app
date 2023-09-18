const SuperheroService = require('./SuperheroService.js');

class SuperheroController {
    async create (req, res) {
        try {
            const superhero = await SuperheroService.create(req.body, req.files)
            if (req.files.length === 0) {
                return res.status(400).json({ error: 'No images uploaded.' });
            }
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
    async edit(req, res) {
        try {
            const superheroId = req.params.id;
            const updatedFields = req.body;
            const images = req.files
            const updatedSuperhero = await SuperheroService.edit(superheroId, updatedFields, images);
            if (!updatedSuperhero) {
                return res.status(404).json({ error: 'Superhero not found' });
            }
            return res.json(updatedSuperhero);
        } catch (e) {
            res.status(500).json({ error: e.message });
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
    async deleteImages(req, res) {
        try {
            const superheroId = req.params.id;
            const imagePathsToRemove = req.body.images;

            const superhero = await SuperheroService.getOne(superheroId);
            if (!superhero) {
                return res.status(404).json({ error: 'Superhero not found' });
            }
            const remainingImages = superhero.images.filter(
                (imagePath) => !imagePathsToRemove.includes(imagePath)
            );

            // Update the superhero object with the remaining images
            superhero.images = remainingImages;

            // Save the updated superhero object
            const updatedSuperhero = await SuperheroService.edit(superheroId, superhero, remainingImages);
            return res.json(updatedSuperhero);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new SuperheroController();