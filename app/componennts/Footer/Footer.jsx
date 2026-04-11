import React from "react";
import "./Footer.css";
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h2>Postly</h2>
          <p>Simple document signing and posting platform.</p>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h4>Product</h4>
            <a href="#">Features</a>
            <a href="#">Pricing</a>
            <a href="#">Documentation</a>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </div>

          <div className="footer-column">
            <h4>Legal</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Postly. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
