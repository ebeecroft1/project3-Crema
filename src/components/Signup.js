import { useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase-config"; // Not sure if this line is doing anything currently?

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });

    return (
        <div>
            <form>
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