import React, {useEffect, useState} from 'react';
import SuperheroItem from "./SuperheroItem";
import {fetchSuperheroes} from "../HeroesApi";
import {Spinner} from "react-bootstrap";
import {Link} from "react-router-dom";

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
    }, [superheroes]);

    if (isLoading) {
        return <Spinner className="spinner" animation="border"/>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="superhero-list" style={{ display: 'flex', flexWrap: 'wrap' }}>
            {superheroes.map((superhero) => (
                <Link to={`/superheroDetails/${superhero._id}`} key={superhero._id}>
                    <SuperheroItem superhero={superhero} />
                </Link>
            ))}
        </div>

    // {superheroes.map((superhero) => (
    //     <Link to={`/superheroDetails/${superhero._id}`} key={superhero._id}>
    //         <SuperheroItem superhero={superhero} />
    //     </Link>
    // ))}
    );
};

export default SuperheroList;
