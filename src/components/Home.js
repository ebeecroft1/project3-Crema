import React from "react";
import { Button, Container, Form, FormControl, Image} from "react-bootstrap";
import "./Home.scss";


function Home() {
    return(
        <Container className="hero" fluid>
            <Image src="./landingcafe.jpeg" alt="Cafe background" fluid/>
            <div className="hero-overlay">
                <Button href="/map" variant="primary" size="lg" style={{color: "#FFFBFE"}}>Coffee near me</Button>
            </div>
        </Container>
    );
}

export default Home;