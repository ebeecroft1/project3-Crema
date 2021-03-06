import React, { useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import {Button, Col, Container, Image, Nav, Row} from "react-bootstrap";

function CafeShow() {
    // Get Cafe ID from URL
    let params = useParams(); // Params = Cafe ID
    let id = params.id;
    const [cafeInfo, setCafeInfo] = useState(null);
    let data;

    const getCafe = async (id) => {
        const cafeDocRef = doc(db, "cafes", id);
        const cafeDocSnap = await getDoc(cafeDocRef);
        data = cafeDocSnap.data();
        setCafeInfo(data);
    };

    useEffect(() => {
        if (cafeInfo === null) {
            getCafe(params.id);
        }
    }, []);

    return (
        <Container fluid>
            { cafeInfo === null ? (
                "Loading"
            ) : (
                <>
                <Row>
                    <Col sm={12} md={6}>
                        <Image src={cafeInfo.imageURL} alt={cafeInfo.name} fluid />
                    </Col>
                    <Col style={{textAlign: "left"}}>
                        <h1 style={{color: "#B87D4B", paddingTop: "10px"}}>
                            {cafeInfo.name}
                        </h1>
                        <h6 style={{color: "#291711"}}>{cafeInfo.address}</h6>
                        <hr className="bg-danger border-2 border-top border-danger"></hr>
                        
                        <h3 style={{color: "#291711"}}>Coffee served: {cafeInfo.beans}</h3>
                        <h3 style={{color: "#291711"}}>Best to Order: {cafeInfo.recOrder}</h3>
                        
                        <hr className="bg-danger border-2 border-top border-danger"></hr>
                    </Col>
                </Row>
                {/* <div style={{textAlign: "left"}}>
                    
                    
                </div> */}
                </>
            ) }
            <hr className="bg-danger border-2 border-top border-danger"></hr>
            <Button href="/review/new" variant="primary" style={{color: "#FFFBFE"}}>Leave Review</Button>
            <Nav.Link href="/map" style={{color: "#3C6E71"}}>Back</Nav.Link>
        </Container>
    );
}

export default CafeShow;