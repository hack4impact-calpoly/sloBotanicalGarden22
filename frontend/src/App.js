import "./App.css";
import Navbar from "./components/Navbar/navbar";
import Login from "./components/Login/login";
import Footer from "./components/Footer/footer";
import Home from "./components/Home/home";
import SignUpForm from "./components/SignUp/SignUpForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";

function App(props) {
  var [isNavbarHidden, setIsNavbarHidden] = useState(false);
  return (
    <>
      <ChakraProvider>
        <Router>
          {isNavbarHidden ? null : <Navbar />}
          <Routes>
            <Route exact path="/" element={<Home />} />
            {/* <Route path="/about" element={<About />} /> */}
            <Route
              path="signup"
              element={<SignUpForm setNavbar={setIsNavbarHidden} />}
            />
            <Route
              path="/login"
              element={<Login setNavbar={setIsNavbarHidden} />}
            />
          </Routes>
        </Router>
      </ChakraProvider>
      <Footer />
    </>
  );
}

export default App;
