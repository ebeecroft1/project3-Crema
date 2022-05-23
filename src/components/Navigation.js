import React, { useContext } from "react";
import { auth } from "../firebase-config";
// import { signOut } from "firebase/auth";
// import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
// import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import Cafe from "./Cafe";
import Signup from "./Signup";
import Login from "./Login";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap"
import { PersonSquare } from "react-bootstrap-icons";

function Navigation() {
    const { currentUser } = useContext(AuthContext);
    console.log(auth.currentUser?.email)

    const logout = async () => {
      await auth.signOut();
    };
    // const navigate = useNavigate();

    // const clickLogin = () => {
    //     if (currentUser) {
    //         signOut(auth);
    //     } else {
    //         navigate("/login");
    //     }
    // };

  return (

    <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="/">
              <img
                alt="Crema Logo"
                src="./coffeegrinder.svg"
                width="30"
                height="60"
                className="d-inline-block align-top"
              />{' '}
              Crema
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
            </Nav>
            { currentUser ? (
              <>
              {/* ToDo - make PersonSquare Icon responsive */}
              {/* <PersonSquare/>  */}
              <NavDropdown title={auth.currentUser?.email} id="basic-nav-dropdown">
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
            
            </Navbar.Collapse>
        </Container>
    </Navbar>

  );
}

export default Navigation;