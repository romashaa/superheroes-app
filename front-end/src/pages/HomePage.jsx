import React, {useState} from 'react';
import SuperheroList from "../components/SuperheroList";
import Button from 'react-bootstrap/Button';
import SuperheroModal from "../components/SuperheroModal";
import {createSuperhero} from "../HeroesApi";

const HomePage = () => {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    return (
        <div>
            <Button variant="primary" onClick={openModal}>Create New Superhero</Button>
            <SuperheroList/>
            <SuperheroModal showModal={showModal} onClose={closeModal} onCreate={(superheroData) => {
                console.log(superheroData);
                createSuperhero(superheroData);
                closeModal();
            }} />
        </div>
    );
};

export default HomePage;
