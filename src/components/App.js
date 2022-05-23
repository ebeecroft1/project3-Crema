import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./AuthProvider";
import Cafe from "./Cafe";
import Login from "./Login";
import Signup from "./Signup";
import Navigation from "./Navigation";
import Profile from "./Profile";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';


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
            <Route exact path="/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
