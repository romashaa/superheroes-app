const request = require('supertest');
const app = require('../../back-end/index');
const SuperheroService = require('../../back-end/SuperheroService');
const path = require("path");
const os = require("os");
const fs = require("fs");

let createdSuperheroId1;
let createdSuperheroId2;

const testAppUrl = 'http://localhost:5000/api';
describe('SuperheroController', () => {
    let createdSuperheroId;
    beforeEach(async () => {
        const image1Path = path.join(os.tmpdir(), 'image1.jpg');
        const image2Path = path.join(os.tmpdir(), 'image2.jpg');
        fs.writeFileSync(image1Path, '');
        fs.writeFileSync(image2Path, '');

        const superheroData1 = {
            nickname: 'Superhero1',
            real_name: 'John Doe 1',
            origin_description: 'Origin description 1',
            superpowers: ['Superpower1', 'Superpower2'],
            catch_phrase: 'Catch phrase 1',
        };
        const response1 = await request(testAppUrl)
            .post('/superheroes')
            .field('nickname', superheroData1.nickname)
            .field('real_name', superheroData1.real_name)
            .field('origin_description', superheroData1.origin_description)
            .field('superpowers', superheroData1.superpowers.join(','))
            .field('catch_phrase', superheroData1.catch_phrase)
            .attach('images', image1Path)
            .attach('images', image2Path);
        createdSuperheroId1 = response1.body._id;
     });

    afterEach(async () => {
        if (createdSuperheroId1) {
            await SuperheroService.delete(createdSuperheroId1);
        }
        if (createdSuperheroId2) {
            await SuperheroService.delete(createdSuperheroId2);
        }
    });

    // it('should create a superhero', async () => {
    //     const superheroData = {
    //         nickname: 'Superman',
    //         real_name: 'Clark Kent',
    //         origin_description: 'Krypton',
    //         superpowers: ['Flight', 'Super strength'],
    //         catch_phrase: 'Up, up, and away!',
    //     };
    //     const image1Path = path.join(os.tmpdir(), 'image1.jpg');
    //     const image2Path = path.join(os.tmpdir(), 'image2.jpg');
    //     fs.writeFileSync(image1Path, '');
    //     fs.writeFileSync(image2Path, '');
    //
    //     try {
    //         console.log("Inside try block");
    //         const response = await request(testAppUrl)
    //             .post('/superheroes')
    //             .set('Content-Type', 'multipart/form-data') // Set content type to form-data
    //             .field('nickname', superheroData.nickname)
    //             .field('real_name', superheroData.real_name)
    //             .field('origin_description', superheroData.origin_description)
    //             .field('superpowers', superheroData.superpowers.join(','))
    //             .field('catch_phrase', superheroData.catch_phrase)
    //             .attach('images', image1Path)
    //             .attach('images', image2Path);
    //
    //         if (response.status !== 200) {
    //             console.error("Superhero creation failed with status: " + response.status);
    //             console.error("Response body:", response.body);
    //             throw new Error("Superhero creation failed.");
    //         }
    //
    //     } catch (error) {
    //         console.error("Error:", error);
    //         expect(() => {
    //             throw error;
    //         }).toThrow();
    //     }
    // });
    //
    it('should get a list of superheroes', async () => {
        const response = await request(testAppUrl).get('/superheroes');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
    //
    // it('should edit a superhero by ID', async () => {
    //     const superhero = await SuperheroService.create({
    //         nickname: 'Wonder Woman',
    //         real_name: 'Diana Prince',
    //         origin_description: 'Themyscira',
    //         superpowers: ['Super strength', 'Lasso of Truth'],
    //         catch_phrase: 'For truth and justice!',
    //     });
    //
    //     const updatedData = {
    //         real_name: 'Diana of Themyscira',
    //         superpowers: ['Super strength', 'Lasso of Truth', 'Flight'],
    //     };
    //
    //     const response = await request(app)
    //         .put(`/superheroes/${createdSuperheroId1}`)
    //         .send(updatedData);
    //
    //     expect(response.status).toBe(200);
    // });
    //
    //
    // it('should delete a superhero by ID', async () => {
    //     const superhero = await SuperheroService.create({
    //         nickname: 'Spider-Man',
    //         real_name: 'Peter Parker',
    //         origin_description: 'New York City',
    //         superpowers: ['Web-slinging', 'Spidey sense'],
    //         catch_phrase: 'With great power comes great responsibility.',
    //     });
    //
    //     const response = await request(app).delete(`/superheroes/${superhero._id}`);
    //
    //     expect(response.status).toBe(200);
    //     expect(response.body._id).toBe(superhero._id);
    //
    //     const deletedSuperhero = await SuperheroService.getOne(superhero._id);
    //     expect(deletedSuperhero).toBeNull();
    // });
});

