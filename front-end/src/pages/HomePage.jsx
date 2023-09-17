import React from 'react';
import heroes from "../img/heroes.jpg"
import SuperheroItem from "../components/SuperheroItem";
import SuperheroList from "../components/SuperheroList";

const HomePage = () => {
    const superhero = {
        "nickname": "Batman",
        "real_name": "Clark Kent",
        "origin_description": "He was born Kal-El on the planet Krypton, before being rocketed to Earth as an infant by his scientist father Jor-El, moments before Krypton's destruction...",
        "superpowers": [
            "Solar energy absorption and healing factor",
            "Solar flare and heat vision",
            "Solar invulnerability",
            "Flight"
        ],
        "catch_phrase": "Look, up in the sky, it's a bird, it's a plane, it's Superman!",
        "images": ["https://static.dc.com/dc/files/default_images/Char_Profile_Batman_20190116_5c3fc4b40faec2.47318964.jpg"]
    }
    return (
        <div>
           <h1>Welcome to Superheroes App!</h1>
            <SuperheroList/>
        </div>
    );
};

export default HomePage;
