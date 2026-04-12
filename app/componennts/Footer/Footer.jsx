import React from "react";
import "./Footer.css";
import Link from "next/link";

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
            <Link href="/Progress">Features</Link>
            <Link href="/Progress">Pricing</Link>
            <Link href="/Progress">Documentation</Link>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <Link href="/Progress">About</Link>
            <Link href="/Progress">Contact</Link>
          </div>

          <div className="footer-column">
            <h4>Legal</h4>
            <Link href="/Progress">Privacy Policy</Link>
            <Link href="/Progress">Terms of Service</Link>
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