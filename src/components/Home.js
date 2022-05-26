import React from "react";
import { Button, Container, Form, FormControl, Image} from "react-bootstrap";
import "./Home.scss"


function Home() {
    return(
        <Container className="hero" fluid>
            <Image src="./landingcafe.jpeg" alt="Cafe background" fluid/>
            <div className="hero-overlay">
                {/* <Form>
                    <FormControl
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                    <Button variant="primary" type="submit">Search</Button>
                </Form> */}
                <Button href="/map" variant="primary">Coffee near me</Button>
            </div>
        </Container>
    );
}

export default Home;