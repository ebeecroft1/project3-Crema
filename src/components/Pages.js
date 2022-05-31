import React from "react";
import {Route, Routes, useLocation } from "react-router-dom";
import Profile from "./users/Profile";
import Home from "./Home";
import Map from "./map/Map";
import Cafes from "./cafes/Cafes";
import CafeShow from "./cafes/CafeShow";
import CafeNew from "./cafes/CafeNew";
import Login from "./users/Login";
import Signup from "./users/Signup";
import ReviewNew from "./reviews/ReviewNew";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

function Pages() {
    const location = useLocation();
    return (
        <div className="App">
        <Routes location={location} key={location.pathname}>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/cafes" element={<Cafes />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/map" element={<Map />} />
            <Route exact path="/cafe/:id" element={<CafeShow />} />
            <Route exact path="/cafe/new" element={<CafeNew />} />
            <Route exact path="/review/new" element={<ReviewNew />} />
        </Routes>
        </div>
    );
}

export default Pages;