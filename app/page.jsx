"use client";
import { useState } from "react";

import Header from "./componennts/Header/Header";
import Document from "./componennts/Document/Document";
import HamBurg from "./componennts/HamBurg/HamBurg";
import Footer from "./componennts/Footer/Footer";

export default function Home() {
  const [showSide, setShowSide] = useState(false);

  const handleButton = () => {
    console.log("button clicked");
    setShowSide(!showSide);
  };


  const menuLinks = [
    { href: "/SignUp", label: "Sign Up" },
    { href: "/Login", label: "Sign In" },
    { href: "/Progress", label: "Documentation" },
    { href: "/Contact", label: "Contact" },
  ];

  return (
    <div className="main">
      <Header handleButton={handleButton} showSide={showSide} />
      {showSide && <HamBurg menuLinks={menuLinks}/>}
      <Document />
      <Footer />
    </div>
  );
}