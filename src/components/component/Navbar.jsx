import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import "../css/Navbar.css"; // Keeping the same import

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); // Renamed isMenuOpen to menuOpen
  const [searchText, setSearchText] = useState(""); // Renamed searchQuery to searchText
  const navigate = useNavigate();

  const handleMenuToggle = () => setMenuOpen(!menuOpen); // Renamed toggleMenu to handleMenuToggle

  const handleSearch = () => {
    if (searchText.trim()) {
      navigate(`/search?query=${searchText}`); // Using searchText instead of searchQuery
    }
  };

  return (
    <header className="nav-header">
      <div className="nav-header-content">
        <Link to="/" className="nav-title">
          MovieDB
        </Link>
        <div className="nav-right-section">
          <nav className={`nav-menu ${menuOpen ? "menu-visible" : ""}`}>
            {["Popular", "Top Rated", "Upcoming"].map((category) => (
              <Link
                key={category}
                to={`/${category.toLowerCase().replace(" ", "")}`}
                className="nav-link"
                onClick={handleMenuToggle}
              >
                {category}
              </Link>
            ))}
          </nav>
          <div className="nav-search-container">
            <input
              type="text"
              placeholder="Search movie"
              className="nav-search-input"
              value={searchText} // Using searchText instead of searchQuery
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button className="nav-search-button" onClick={handleSearch}>
              Search
            </button>
          </div>
          <button
            className="nav-hamburger"
            onClick={handleMenuToggle}
            aria-label="Menu"
          >
            <IoMenu />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
