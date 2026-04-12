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

  return (
    <div className="main">
      <Header handleButton={handleButton} showSide={showSide} />
      {showSide && <HamBurg />}
      <Document />
      <Footer />
    </div>
  );
}