import React from "react";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./AuthProvider";
import Navigation from "./Navigation";
import Pages from "./Pages";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";


function App() {

  return (
    <AuthProvider>
        <BrowserRouter>
          <Navigation />
          <Pages />
        </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
