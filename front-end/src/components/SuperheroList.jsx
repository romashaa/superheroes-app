import React, {useEffect, useState} from 'react';
import SuperheroItem from "./SuperheroItem";
import {fetchSuperheroes} from "../HeroesApi";

const SuperheroList = () => {
    const [superheroes, setSuperheroes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchSuperheroes();
                setSuperheroes(data);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="superhero-list">
            {superheroes.map((superhero) => (
                <SuperheroItem key={superhero._id} superhero={superhero} />
            ))}
        </div>
    );
};

export default SuperheroList;
