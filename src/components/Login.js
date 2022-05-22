import { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
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
                <button>Login</button>
            </form>
        </div>
    );

}   

export default Login;