import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import availableSuperpowers from "../Superpowers";

const SuperheroModal = ({ showModal, onClose, onCreate }) => {
    const [superheroData, setSuperheroData] = useState({
        nickname: '',
        real_name: '',
        origin_description: '',
        superpowers: [],
        catch_phrase: '',
        images: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSuperheroData({ ...superheroData, [name]: value });
    };

    const handleSuperpowersChange = (e) => {
        const selectedPowers = Array.from(e.target.selectedOptions, (option) => option.value);
        setSuperheroData({ ...superheroData, superpowers: selectedPowers });
    };

    const handleSubmit = () => {
        onCreate(superheroData);
        onClose();
    };

    return (
        <Modal show={showModal} onHide={onClose}>
            <Modal.Header>
                <Modal.Title>Create New Superhero</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Nickname</Form.Label>
                        <Form.Control
                            type="text"
                            name="nickname"
                            value={superheroData.nickname}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Real Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="real_name"
                            value={superheroData.real_name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Origin Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="origin_description"
                            value={superheroData.origin_description}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Superpowers (Select multiple)</Form.Label>
                        <Form.Control
                            as="select"
                            multiple
                            name="superpowers"
                            value={superheroData.superpowers}
                            onChange={handleSuperpowersChange}
                        >
                            {availableSuperpowers.map((power) => (
                                <option key={power} value={power}>
                                    {power}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Catch Phrase</Form.Label>
                        <Form.Control
                            type="text"
                            name="catch_phrase"
                            value={superheroData.catch_phrase}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Images (Select image files)</Form.Label>
                        <Form.File
                            type="file"
                            name="images"
                            accept=".jpg, .jpeg, .png"
                            multiple
                            onChange={(e) => {
                                const selectedImages = Array.from(e.target.files); // Convert FileList to an array
                                setSuperheroData({ ...superheroData, images: selectedImages });
                            }}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Create Superhero
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
export default SuperheroModal;
