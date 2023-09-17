import React from 'react';
import Card from "react-bootstrap/Card";

const SuperheroItem = ({superhero}) => {
    const cardStyle = {
        width: '18rem',
        border: '2px solid #ccc',
        borderRadius:'5px'
    };

    const imageStyle = {
        width: '90%',
        padding:'7px'
    };
    return (
        <Card style={cardStyle}>
            {/*<Card.Img variant="top" style={imageStyle} src={superhero.images[0]} alt={superhero.nickname} />*/}
            <Card.Body>
                <Card.Title><h2>{superhero.nickname}</h2></Card.Title>
            </Card.Body>
        </Card>
    );
};

export default SuperheroItem;
