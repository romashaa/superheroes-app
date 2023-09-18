import React, {useState} from 'react';
import Card from "react-bootstrap/Card";

const SuperheroItem = ({superhero}) => {
    const [isHovered, setIsHovered] = useState(false);
    const cardStyle = {
        width: '17vw',
        height:'60vh',
        border: `${isHovered ? '4px' : '2px'} solid ${isHovered ? 'blue' : '#ccc'}`,
        borderRadius:'5px',
        margin: '10px',
        padding:'5px',
        transition: 'border-color 0.7s ease'
    };

    const imageStyle = {
        width: '100%',
        height: '80%',
        margin:'auto'
    };
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    return (
        <Card
            style={cardStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Card.Img variant="top" style={imageStyle} src={superhero.images[0]} alt={superhero.nickname} />
            <Card.Body>
                <Card.Title><h3>{superhero.nickname}</h3></Card.Title>
            </Card.Body>
        </Card>
    );
};

export default SuperheroItem;
