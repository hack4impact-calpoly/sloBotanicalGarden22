<<<<<<< HEAD
import AnnouncementBar from "./AnnouncementBar";
import Contribution from "./Contribution";

function App() {
  return (
    <div className="App">
      <AnnouncementBar />
      <Contribution />
    </div>
=======
import "./App.css";
import Navbar from "./components/Navbar/navbar";
import Home from "./components/Home/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route exact path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </Router>
>>>>>>> 074345cb63d8ed064c396765c329f2ff8fe50549
  );
}

export default App;
