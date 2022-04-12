import "./App.css";
import Navbar from "./components/Navbar/navbar";
import Login from "./components/Login/login";
import Footer from "./components/Footer/footer";
import Home from "./components/Home/home";
import awsconfig from "./aws-exports";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import ContributionTable from "./components/ContributionTable/ContributionTable";
function App() {
  return (
    //<Login></Login>
    <ChakraProvider>
      <Router>
        {/* <Navbar /> */}
        <ContributionTable />

        <Routes>
          <Route exact path="/" element={<Home />} />
          {/* <Route path="/about" element={<About />} /> */}
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
