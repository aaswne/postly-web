"use client";

import "./Header.css";
import HamburgButton from "../../font/font";
import Link from "next/link";

function Header({ handleButton }) {
  return (
    <div className="header">
      <div className="left">
        <h2>Postly</h2>
      </div>

      <div className="right">
        <HamburgButton className="hamburg" onClick={handleButton} />
      </div>

      <div className="desktop">
        <Link href="/SignUp">Sign Up</Link>
        <Link href="/Login">Sign In</Link>
        <Link href="/Progress">Documentation</Link>
        <Link href="/Progress">Contact</Link>
      </div>
    </div>
  );
}

export default Header;
