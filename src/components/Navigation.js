import React, { useState, useEffect, useContext } from "react";
import { auth, db } from "../firebase-config";
import { signOut } from "firebase/auth";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import Cafe from "./Cafe";
import Signup from "./Signup";
import Login from "./Login";
import {Navbar, Nav, NavDropdown, Container } from "react-bootstrap"

function Navigation() {
    const { currentUser } = useContext(AuthContext);

    // const navigate = useNavigate();

    // const clickLogin = () => {
    //     if (currentUser) {
    //         signOut(auth);
    //     } else {
    //         navigate("/login");
    //     }
    // };

  return (
    // <div className="Navbar">
    //     <h1>Welcome {auth.currentUser?.email}</h1>
    //     <button onClick={signOut(auth)}>
    //         {currentUser ? "Log Out" : "Login"}
    //     </button>
        
    // </div>

    <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
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
              Welcome {auth.currentUser?.email}
              </>
            ) : (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
              </>
            )}
            
            </Navbar.Collapse>
        </Container>
    </Navbar>

  );
}

export default Navigation;