import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    return (
        <Navbar style={{backgroundColor:"#22668D"}} variant="dark" expand="lg">
            <Container>
                <Link to="/" className="navbar-brand">
                    <FontAwesomeIcon icon={faHome} className="mr-2" />
                    Superheroes App
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
            </Container>
        </Navbar>
    );
};

export default Header;
