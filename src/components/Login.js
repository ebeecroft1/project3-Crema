import { useState } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import GoogleButton from 'react-google-button';

function Login() {
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
        function onRegister() {
            signInWithEmailAndPassword(auth, email, password).catch((error) =>
                console.log(error)
            );
            navigate("/");
        }
        onRegister();
    };

    return (
        <div>
            <form className="loginForm" onSubmit={_handleSubmit}>
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
            <GoogleButton
                onClick={signInWithGoogle}
                content="Sign in with google"
            />
        </div>
    );

}   

export default Login;