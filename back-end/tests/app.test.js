const request = require('supertest');
const app = require('../../back-end/index'); // Import your Express app instance
const SuperheroService = require('../SuperheroService'); // Import your service

jest.mock('../SuperheroService'); // Mock the SuperheroService

describe('POST /api/superheroes', () => {
    it('should create a new superhero', async () => {
        // Mock the SuperheroService.create function to return a superhero
        SuperheroService.create.mockResolvedValue({
            _id: 'some-id',
            nickname: 'Superman',
            real_name: 'Clark Kent',
            // Add other properties as needed
        });

        const response = await request(app)
            .post('/api/superheroes')
            .attach('images', 'path/to/image.jpg')
            .field('nickname', 'Superman')
            .field('real_name', 'Clark Kent')
            .field('origin_description', 'Kryptonian')
            .field('superpowers', 'Super strength, flight')
            .field('catch_phrase', 'Up, up, and away!');

        expect(response.status).toBe(201);
        expect(response.body.nickname).toBe('Superman');
        // Add other expectations as needed
    });

    it('should return a 400 error when no images are uploaded', async () => {
        const response = await request(app)
            .post('/api/superheroes')
            .field('nickname', 'Superman')
            .field('real_name', 'Clark Kent')
            .field('origin_description', 'Kryptonian')
            .field('superpowers', 'Super strength, flight')
            .field('catch_phrase', 'Up, up, and away!');

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('No images uploaded.');
    });

    it('should return a 500 error when an error occurs during creation', async () => {
        // Mock the SuperheroService.create function to throw an error
        SuperheroService.create.mockRejectedValue(new Error('Some error'));

        const response = await request(app)
            .post('/api/superheroes')
            .attach('images', 'path/to/image.jpg')
            .field('nickname', 'Superman')
            .field('real_name', 'Clark Kent')
            .field('origin_description', 'Kryptonian')
            .field('superpowers', 'Super strength, flight')
            .field('catch_phrase', 'Up, up, and away!');

        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Some error');
    });
});