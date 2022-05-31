import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { storage } from "../../firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid"; // Generate random image ID

function CafeNew() {
    const [imageUpload, setImageUpload] = useState(null);

    const uploadImage = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then(() => {
            alert("Image uploaded");
        })
    };

    return (
        <Container fluid>
            <Image src="/cafemural.jpeg" alt="Cafe mural" fluid/>
            <h1 style={{color: "#B87D4B", paddingTop: "10px"}}>
                Add New Cafe
            </h1>
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
                    <Form.Label column sm={2}>Name</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Cafe name"
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalStreet">
                    <Form.Label column sm={2}>Street</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Street"
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalFile">
                    <Form.Label column sm={2}>Images</Form.Label>
                    <Col sm={10}>
                        <Form.Control type="file" onChange={(event) => {setImageUpload(event.target.files[0])}}/>
                    </Col>
                </Form.Group>
                <Button variant="primary" style={{color: "#FFFBFE"}} type="button" onClick={uploadImage}>
                    Submit
                </Button>
            </Form>
        </Container>
    );
}

export default CafeNew;