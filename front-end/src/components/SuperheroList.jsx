import React, {useEffect, useState} from 'react';
import SuperheroItem from "./SuperheroItem";
import {fetchSuperheroes} from "../HeroesApi";
import {Spinner} from "react-bootstrap";
import {Link} from "react-router-dom";
import * as pageNumbers from "react-bootstrap/ElementChildren";

const SuperheroList = () => {
    const [superheroes, setSuperheroes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const heroesPerPage = 5;
    const indexOfLastHero = currentPage * heroesPerPage;
    const indexOfFirstHero = indexOfLastHero - heroesPerPage;
    const currentHeroes = superheroes.slice(indexOfFirstHero, indexOfLastHero);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(superheroes.length / heroesPerPage); i++) {
        pageNumbers.push(i);
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
        return <Spinner className="spinner" animation="border"/>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <div className="superhero-list" style={{ display: 'flex', flexWrap: 'wrap' }}>
                {currentHeroes.map((superhero) => (
                    <Link to={`/superheroDetails/${superhero._id}`} key={superhero._id}>
                        <SuperheroItem superhero={superhero} />
                    </Link>
                ))}
            </div>
            <nav className="pag-buttons">
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button
                            className="page-link"
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            Previous
                        </button>
                    </li>
                    {pageNumbers.map((number) => (
                        <li
                            key={number}
                            className={`page-item ${currentPage === number ? 'active' : ''}`}
                        >
                            <button
                                className="page-link"
                                onClick={() => setCurrentPage(number)}
                            >
                                {number}
                            </button>
                        </li>
                    ))}
                    <li
                        className={`page-item ${
                            currentPage === Math.ceil(superheroes.length / heroesPerPage)
                                ? 'disabled'
                                : ''
                        }`}
                    >
                        <button
                            className="page-link"
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default SuperheroList;
