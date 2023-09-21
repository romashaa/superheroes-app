import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {API_URL} from "./consts";

const API_BASE_URL = `/api/superheroes`;

export const fetchSuperheroes = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const deleteSuperhero = (id) => {
    axios.delete(`${API_BASE_URL}/${id}`)
        .then((response) => {
            console.log("deleted")
        })
        .catch((error) => {
            console.error("Error deleting hero:", error);
        });
};

export const fetchSuperheroById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

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

export const editSuperhero = async (superheroId, updatedData) => {
    try {
        const formData = new FormData();
        formData.append('nickname', updatedData.nickname);
        formData.append('real_name', updatedData.real_name);
        formData.append('origin_description', updatedData.origin_description);
        updatedData.superpowers.forEach((power, index) => {
            formData.append(`superpowers[${index}]`, power);
        });
        formData.append('catch_phrase', updatedData.catch_phrase);

        updatedData.images.forEach((image, index) => {
            formData.append('images', image);
        });

        const response = await axios.put(`${API_BASE_URL}/${superheroId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};