import React from "react";
import { Button, Container, Form, FormControl, Image} from "react-bootstrap";
import "./Home.scss";


function Home() {
    return(
        <div className="hero" >
            <Image src="./landingcafe.jpeg" alt="Cafe background" fluid/>
            <div className="hero-overlay">
                <Button href="/map" variant="primary" style={{color: "#FFFBFE"}}>Coffee near me</Button>
            </div>
        </div>
    );
}

export default Home;