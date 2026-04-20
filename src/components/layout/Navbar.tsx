import React from 'react';
import { Link } from '@tanstack/react-router';

const Navbar = () => {
  return (
    <nav>
      <div className="nav-inner">
        <a href="#" className="logo">
          <div className="logo-icon">H</div>
          <span className="logo-text">HireSort</span>
        </a>
        <div className="nav-links">
          <a href="#how">How it works</a>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <Link to="/contact_us">
            <span>Contact Us</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
