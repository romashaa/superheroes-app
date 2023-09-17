import axios from 'axios';

const API_BASE_URL = "/api/superheroes";

export async function fetchSuperheroes() {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const createSuperhero = async (superheroData) => {
    try {
        const formData = new FormData();

        formData.append('nickname', superheroData.nickname);
        formData.append('real_name', superheroData.real_name);
        formData.append('origin_description', superheroData.origin_description);
        superheroData.superpowers.forEach((power, index) => {
            formData.append(`superpowers[${index}]`, power);
        });
        formData.append('catch_phrase', superheroData.catch_phrase);

        superheroData.images.forEach((image, index) => {
            formData.append('images', image);
        });

        const response = await axios.post(API_BASE_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};