import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./AuthProvider";
import Cafes from "./cafes/Cafes";
import Login from "./users/Login";
import Signup from "./users/Signup";
import Navigation from "./Navigation";
import Profile from "./users/Profile";
import Home from "./Home";
import Map from "./Map";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";


function App() {

  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/cafes" element={<Cafes />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/map" element={<Map />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
