import React, {useEffect, useState} from 'react';
import {Button, Form, Modal, Alert} from "react-bootstrap";
import availableSuperpowers from "../Superpowers";
import {FaTrash, FaTrashAlt} from "react-icons/fa";
import {API_URL} from "../consts";

const SuperheroModal = ({ showModal, onClose, onCreate, editedSuperhero }) => {
    const emptySuperhero = {
        nickname: '',
        real_name: '',
        origin_description: '',
        superpowers: [],
        catch_phrase: '',
        images: [],
    }
    const [superheroData, setSuperheroData] = useState(editedSuperhero || emptySuperhero);
    const [showError, setShowError] = useState(false);
    useEffect(() => {
        if (editedSuperhero) {
            setSuperheroData(editedSuperhero);
        }
    }, [editedSuperhero]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSuperheroData({ ...superheroData, [name]: value });
    };

    const handleSuperpowersChange = (e) => {
        const selectedPowers = Array.from(e.target.selectedOptions, (option) => option.value);
        setSuperheroData({ ...superheroData, superpowers: selectedPowers });
    };

    const handleSubmit = () => {
        if (
            superheroData.nickname === '' ||
            superheroData.real_name === '' ||
            superheroData.origin_description === '' ||
            superheroData.superpowers.length === 0 ||
            superheroData.catch_phrase === '' ||
            superheroData.images.length === 0
        ) {
            setShowError(true);
        } else {
            onCreate(superheroData);
            {!editedSuperhero && setSuperheroData(emptySuperhero);}
            setShowError(false);
            onClose();
        }
    };
    const handleClose = () =>{
        {!editedSuperhero && setSuperheroData(emptySuperhero)}
        onClose();
        setShowError(false);
    }

    // const handleImageChange = (e) => {
    //     const selectedImages = Array.from(e.target.files);
    //     const existingImages = editedSuperhero.images || [];
    //     setSuperheroData({
    //         ...superheroData,
    //         images: [...existingImages, ...selectedImages],
    //     });
    // };
    const handleImageChange = (e) => {
        const selectedImages = Array.from(e.target.files);
        const existingImages = editedSuperhero ? editedSuperhero.images : [];
        setSuperheroData({
            ...superheroData,
            images: [...existingImages, ...selectedImages],
        });
    };


    const handleRemoveImage = (indexToRemove) => {
        const updatedImages = superheroData.images.filter(
            (_, index) => index !== indexToRemove
        );
        setSuperheroData({ ...superheroData, images: updatedImages });
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>{editedSuperhero ? "Edit" : "Create new"} Superhero</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {showError && (
                    <Alert variant="danger">Please fill in all required fields.</Alert>
                )}
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
                            onChange={handleImageChange}
                        />
                    </Form.Group>
                    {superheroData.images.length > 0 && (
                        <div>
                            <p>Selected Images:</p>
                            <ul>
                                {editedSuperhero && (editedSuperhero.images.map((image, index) => (
                                    <li key={index}>
                                        <span>{image}</span>
                                        <button
                                            type="button"
                                            style={{border:'none', backgroundColor:'white'}}
                                            onClick={() => handleRemoveImage(index)}
                                        >
                                            <FaTrashAlt/>
                                        </button>
                                    </li>
                                )))}
                                {superheroData.images.map((image, index) => (
                                    <li key={index}>
                                        <span>{image.name}</span>
                                        <button
                                            type="button"
                                            style={{border:'none', backgroundColor:'white'}}
                                            onClick={() => handleRemoveImage(index)}
                                        >
                                            <FaTrashAlt/>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
export default SuperheroModal;
