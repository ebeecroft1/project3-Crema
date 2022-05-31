import React, { useContext } from "react";
import { auth } from "../firebase-config";
import { AuthContext } from "./AuthProvider";
import { Navbar, Nav, NavDropdown, Container, Form, FormControl, Button } from "react-bootstrap";
import { PersonSquare } from "react-bootstrap-icons";

function Navigation() {
    const { currentUser } = useContext(AuthContext);
    console.log(auth.currentUser?.email)

    const logout = async () => {
      await auth.signOut();
    };

  return (

    <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="/">
              <img
                alt="Crema Logo"
                src="/coffeegrinder.svg"
                width="30"
                height="60"
                className="d-inline-block align-top"
              />{' '}
              Crema
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
            
            <Form className="d-flex me-auto">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-auto shadow-none"
                aria-label="Search"
                // onChange={findCafes}
              />
            </Form>
            
            <Nav className="ms-auto">
              { currentUser ? (
                <>
                <NavDropdown title={auth.currentUser?.email}>
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item href="/" onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
                </>
              ) : (
                <>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/signup">Signup</Nav.Link>
                </>
              )}
            </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>

  );
}

export default Navigation;