import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/component/Navbar"; // Adjust path based on your structure
import { Home } from "./pages/page/Home";
import MovieContent from "./pages/page/MovieContent";
import { UpcommingMovie } from "./pages/page/UpcomingMovie";
import { TopRated } from "./pages/page/TopRated";
import { Popular } from "./pages/page/Popular";
const App = () => {
  return (
    <Router>
      <Navbar />
      <div style={{ margin: 0 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="movie/:id" element={<MovieContent />} />{" "}
          <Route path="upcoming" element={<UpcommingMovie />} />{" "}
          <Route path="toprated" element={<TopRated />} />{" "}
          <Route path="popular" element={<Popular />} />{" "}
          <Route path="search" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
