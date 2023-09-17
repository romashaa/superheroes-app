import React, {useEffect, useState} from 'react';
import SuperheroItem from "./SuperheroItem";
import {fetchSuperheroes} from "../HeroesApi";
import {Spinner} from "react-bootstrap";

const SuperheroList = () => {
    const [superheroes, setSuperheroes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const spinnerStyle = {
        position:'absolute',
        right:'50%',
        top:'50%',
        width: '100px',
        height: '100px'
    }

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
        return <Spinner style={spinnerStyle} animation="border"/>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="superhero-list" style={{ display: 'flex', flexWrap: 'wrap' }}>
            {superheroes.map((superhero) => (
                <SuperheroItem key={superhero._id} superhero={superhero} />
            ))}
        </div>
    );
};

export default SuperheroList;
