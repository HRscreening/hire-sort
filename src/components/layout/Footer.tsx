import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <a href="#" className="logo" style={{ marginBottom: '4px' }}>
            <div className="logo-icon">H</div>
            <span className="logo-text">HireSort</span>
          </a>
          <p>AI-powered resume screening that explains its reasoning. Built for hiring teams who value transparency.</p>
        </div>
        <div className="footer-col">
          <h4>Product</h4>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          {/* <a href="#">API</a> */}
          {/* <a href="#">Changelog</a> */}
        </div>
        <div className="footer-col">
          <h4>Resources</h4>
          <a href="#">Documentation</a>
          <a href="#">Blog</a>
          <a href="#">Help Center</a>
          <a href="#">Status</a>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <a href="#">About</a>
          <a href="#">Careers</a>
          <a href="#">Contact</a>
        </div>
        <div className="footer-col">
          <h4>Legal</h4>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Security</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 HireSort. All rights reserved.</span>
        <span>Made with care for hiring teams everywhere.</span>
      </div>
    </footer>
  );
};

export default Footer;
