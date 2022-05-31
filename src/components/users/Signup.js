import React, { useState } from "react";
import { auth } from "../../firebase-config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
import GoogleButton from 'react-google-button';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const provider = new GoogleAuthProvider();
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
            navigate("/");
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }

    const _handleSubmit = (event) => {
        event.preventDefault();
        function onSignup() {
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
            })
            .catch((error) => console.log(error));
            navigate("/");
        }
        onSignup();
    };

    return (
        <Container fluid>
            <Form>
                <Form.Group className="m-3" controlId="formGroupEmail">
                    <Form.Control
                        type="email"
                        placeholder="coffee@ga.co"
                        className="shadow-none"
                        required
                        style={{
                            maxWidth: "500px"
                        }}
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                    />
                </Form.Group>

                <Form.Group className="m-3" controlId="formGroupPassword">
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        className="shadow-none"
                        required
                        style={{
                            maxWidth: "500px"
                        }}
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                    />
                </Form.Group>
                
                <Button
                    variant="primary"
                    style={{
                        color: "#FFFBFE",
                        width: "240px",
                        height: "50px"
                    }}
                    type="button"
                    onClick={_handleSubmit}
                >
                    Sign Up
                </Button>
                
                <GoogleButton
                    onClick={signInWithGoogle}
                    content="Sign in with google"
                    style={{
                        margin: "0 auto",
                        marginTop: "1em"
                    }}
                />

            </Form>
        </Container>
    );

}   

export default Signup;