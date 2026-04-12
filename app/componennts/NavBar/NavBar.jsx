"use client";
import "./NavBar.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth, db } from "../../Config/config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";

function NavBar({ darkModeToggle, darkMode, show, buttonClick }) {
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
    <header className="header" >
      
      <div className="header-left">
        <h2 className="logo">
          Postly <span className="span">– simplify your API data</span>
        </h2>

        <nav
          className="nav-links"
        >
          <a href="/documents">Documents</a>
          <a href="/how-to-use">How to Use</a>
          <a href="/help">Help</a>
        </nav>

      </div>


      <div className="header-right">
       

        <div className="profile">
          <img
          src="https://picsum.photos/400/300"
            onClick={gotoProfile}
            className="profile-img"
          />
        </div>
                            <button className="hamBurg" onClick={buttonClick} >{show?<RxCross2/>:<RxHamburgerMenu/>}</button>

        
      </div>

    </header>
  );
}

export default NavBar;