"use client";
import "./NavBar.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth, db } from "../../Config/config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

function NavBar({ darkModeToggle, darkMode }) {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState(null);

  const gotoProfile = () => {
    router.push("./Profile");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const docRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            setProfileImage(userData.photoURL || null);
          }
        } catch (error) {
          console.error("Error fetching profile image:", error);
        }
      } else {
        setProfileImage(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <header className="header" style={{ color: darkMode ? "white" : "black" }}>
      <div className="header-left">
        <h2 className="logo">
          Postly <span className="span">– simplify your API data</span>
        </h2>

        <nav
          className="nav-links"
          style={{ color: darkMode ? "white" : "black" }}
        >
          <a href="/documents">Documents</a>
          <a href="/how-to-use">How to Use</a>
          <a href="/help">Help</a>
        </nav>
      </div>

      <div className="header-right">
        <button onClick={darkModeToggle} className="darkmode-btn">
          {darkMode ? "🌙" : "☀️"}
        </button>

        <div className="profile">
          <img
            onClick={gotoProfile}
            src={profileImage || "https://via.placeholder.com/40"}
            alt="Profile"
            className="profile-img"
          />
        </div>
      </div>
    </header>
  );
}

export default NavBar;