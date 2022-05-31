import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { db, storage } from "../../firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid"; // Generate random image ID
import axios from "axios"; // For fetching address geocode from Google Maps

function CafeNew() {
    let navigate = useNavigate();

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [imageUpload, setImageUpload] = useState(null);
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");

    const uploadImage = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then(() => {
            alert("Image uploaded");
        })
    };

    const getGeocode = () => {
        axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
            params:{
                address: address,
                key: process.env.REACT_APP_FIREBASE_API_KEY
            }
        })
        .then(function(response) {
            console.log(response);
            console.log(response.data.results[0].geometry.location.lat);
            setLat(response.data.results[0].geometry.location.lat);
            console.log(response.data.results[0].geometry.location.lng);
            setLng(response.data.results[0].geometry.location.lng);
        })
    };

    // Post new cafe to Firestore
    const createCafe = async () => {
        const newCafeRef = collection(db, "cafes");
        console.log("new cafe ref" + JSON.stringify(newCafeRef));
        const cafeRef = await addDoc(newCafeRef, {
            name: name,
            address: address,
            latitude: lat,
            longitude: lng,
            // imagesURL
        });
        navigate(`/map`)
    };

    return (
        <>
        <Image src="/cafemural.jpeg" alt="Cafe mural" fluid/>
        <Container fluid>
            
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
                            onChange={(event) => {
                                setName(event.target.value);
                            }}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalAddress">
                    <Form.Label column sm={2}>Address</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Address"
                            onChange={(event) => {
                                setAddress(event.target.value);
                            }}
                            onBlur={getGeocode}
                        />
                    </Col>
                    {/* <Button onClick={getGeocode}>Geocode test</Button> */}
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalFile">
                    <Form.Label column sm={2}>Images</Form.Label>
                    <Col sm={10}>
                        <Form.Control type="file" onChange={(event) => {setImageUpload(event.target.files[0])}}/>
                    </Col>
                </Form.Group>
                <Button variant="primary" style={{color: "#FFFBFE"}} type="button" onClick={createCafe}>
                    Submit
                </Button>
            </Form>
        </Container>
        </>
    );
}

export default CafeNew;