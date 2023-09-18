import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Spinner} from "react-bootstrap";
import {fetchSuperheroById} from "../HeroesApi";
import Card from "react-bootstrap/Card";
import {API_URL} from "../consts";
import Button from "react-bootstrap/Button";

const SuperHeroDetails = () => {
    const { id } = useParams();
    const [superhero, setSuperhero] = useState(null);

    useEffect(() => {
        async function fetchSuperhero() {
            try {
                const data = await fetchSuperheroById(id);
                setSuperhero(data);
                console.log(data)
            } catch (error) {
                console.error('Error fetching superhero details:', error);
            }
        }
        fetchSuperhero();
    }, [id]);

    if (!superhero) {
        return <Spinner className="spinner" animation="border"/>;
    }

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
                    <Button style={{marginRight:'10px'}} variant="success">Edit</Button>
                    <Button variant="danger">Delete</Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default SuperHeroDetails;
