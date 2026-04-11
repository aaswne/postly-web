"use client";
import { useState } from "react";

import Header from "./componennts/Header/Header";
import Document from "./componennts/Document/Document";
import SideBar from "./componennts/SideBar/SideBar";
import Footer from "./componennts/Footer/Footer";
export default function Home() {
  const [showSide, setShowSide] = useState(false);

  const handleButton = () => {
    console.log("button clicked");
  };

  return (
    <div className="main">
      <Header handleButton={handleButton}  />
      {showSide && <SideBar />}
      <Document />
      <Footer />
    </div>
  );
}
