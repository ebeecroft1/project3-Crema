import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config"

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

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
        </div>
    );

}   

export default Login;