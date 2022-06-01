import React from "react";
import { Button, Container, Image } from "react-bootstrap";
import "./Home.scss";


function Home() {
    return(
        <>
            <div className="hero" >
                <Image src="./landingcafe.jpeg" alt="Cafe background" fluid/>
                <div className="hero-overlay">
                    <Button href="/map" variant="primary" style={{color: "#FFFBFE"}}>Coffee near me</Button>
                </div>
            </div>
            <Container fluid>
                <hr className="bg-danger border-2 border-top border-danger"></hr>
                <h1 style={{color: "#B87D4B", paddingTop: "10px"}}>
                    Find the best coffee.
                </h1>
                <hr className="bg-danger border-2 border-top border-danger"></hr>
            </Container>
        </>
    );
}

export default Home;