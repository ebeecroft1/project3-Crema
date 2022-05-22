import React, { useState } from "react";
import { auth } from "../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

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
        <div>
            <form className="signupForm" onSubmit={_handleSubmit}>
                <input
                    placeholder="Email..."
                    required
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }}
                />
                <input
                    placeholder="Password..."
                    required
                    onChange={(event) => {
                        setPassword(event.target.value);
                    }}
                />
                <button>Sign up</button>
            </form>
        </div>
    );

}   

export default Signup;