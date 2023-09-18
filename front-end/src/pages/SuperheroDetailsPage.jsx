import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Spinner} from "react-bootstrap";
import {deleteSuperhero, editSuperhero, fetchSuperheroById} from "../HeroesApi";
import Card from "react-bootstrap/Card";
import {API_URL} from "../consts";
import Button from "react-bootstrap/Button";
import SuperheroModal from "../components/SuperheroModal";

const SuperHeroDetails = () => {
    const { id } = useParams();
    const [superhero, setSuperhero] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editedSuperhero, setEditedSuperhero] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchSuperhero() {
            try {
                const data = await fetchSuperheroById(id);
                setSuperhero(data);
            } catch (error) {
                console.error('Error fetching superhero details:', error);
            }
        }
        fetchSuperhero();
    }, [id]);

    const handleEditClick = () => {
        setEditModalOpen(true);
        setEditedSuperhero(superhero);
    };
    const handleDeleteClick = () => {
        deleteSuperhero(superhero._id);
        navigate("/")
    }

    if (!superhero) {
        return <Spinner className="spinner" animation="border"/>;
    }
    const handleEditSuperhero = async (superheroData) => {
        try {
            const updatedSuperhero = await editSuperhero(editedSuperhero._id, superheroData);
            setSuperhero(updatedSuperhero);
            setEditModalOpen(false);
        } catch (error) {
            console.error('Error editing superhero:', error);
        }
    };


    return (
        <div className="superhero-details-page">
            <div className="image-list-container">
                <div className="image-list">
                    {superhero.images.map((image, index) => (
                        <img
                            key={index}
                            src={`${API_URL}${image}`}
                            alt={`Superhero ${index + 1}`}
                            className="image-item"
                        />
                    ))}
                </div>
            </div>
            <Card className="hero-card">
                <Card.Header style={{textAlign:"center"}} as="h3">{superhero.nickname}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <strong>Real name:</strong> {superhero.real_name}
                    </Card.Text>
                    <Card.Text>
                        <strong>Origin description:</strong> {superhero.origin_description}
                    </Card.Text>
                    <Card.Text>
                        <strong>Superpowers:</strong> {superhero.superpowers.join(', ')}
                    </Card.Text>
                    <Card.Text>
                        <strong>Catch phrase:</strong> {superhero.catch_phrase}
                    </Card.Text>
                    <Button style={{marginRight:'10px'}} variant="success" onClick={handleEditClick}>Edit</Button>
                    <Button variant="danger" onClick={handleDeleteClick}>Delete</Button>
                </Card.Body>
            </Card>
            <SuperheroModal
                showModal={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                onCreate={handleEditSuperhero}
                editedSuperhero={superhero}

            />
        </div>
    );
};

export default SuperHeroDetails;
