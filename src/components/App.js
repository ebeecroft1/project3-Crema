import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import '../App.css';
import AuthProvider from "./AuthProvider";
import Cafe from "./Cafe";
import Login from "./Login";
import Signup from "./Signup";
import Navigation from "./Navigation";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route exact path="/" element={<Cafe />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
