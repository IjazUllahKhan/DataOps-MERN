import React from "react";
import "./header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav className="navbar">
        <div className="container">
          <Link to="/" className="brand">
            DataOps-mern
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Header;
