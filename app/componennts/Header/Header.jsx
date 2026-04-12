"use client";

import "./Header.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";

import Link from "next/link";

function Header({ handleButton, showSide }) {
  return (
    <div className="header">
      <div className="left">
        <h2>Postly</h2>
      </div>

      <div className="right" onClick={handleButton}>
        <button
  className={`hamburgButton ${showSide ? "active" : ""}`}
>
  {showSide ? <RxCross2 /> : <RxHamburgerMenu />}
</button>
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
