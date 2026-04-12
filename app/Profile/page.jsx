"use client";

import { auth, db, storage } from "../Config/config";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function Page() {
  const [userId, setUserId] = useState(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const route =useRouter()

  const fileInputRef = useRef();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    bio: "",
    photoURL: "",
  });

  // ✅ Auth + fetch data
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUserId(currentUser.uid);

        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData(data);
          setPreview(data.photoURL); // load image
        } else {
          setFormData((prev) => ({
            ...prev,
            email: currentUser.email || "",
          }));
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // ✅ input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ select image
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // ✅ upload image
  const uploadImage = async () => {
    if (!image || !userId) return formData.photoURL;

    const storageRef = ref(storage, `profileImages/${userId}`);

    await uploadBytes(storageRef, image);
    const url = await getDownloadURL(storageRef);

    return url;
  };

  // ✅ save everything
  const handleSave = async () => {
    if (!userId) return alert("User not logged in");

    try {
      const imageUrl = await uploadImage();

      await setDoc(doc(db, "users", userId), {
        ...formData,
        photoURL: imageUrl,
        updatedAt: new Date(),
      });

      alert("Profile saved ✅");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-left">
          <div className="profile-image-wrapper">
            <img
  src={preview || "https://i.pravatar.cc/150?img=50"}
  alt="Profile"
  className="profile-image"
/>
          </div>

          {/* hidden input */}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageSelect}
          />

          <button
            onClick={() => fileInputRef.current.click()}
            className="profile-btn upload-btn"
          >
            Add Image (coming soon)
          </button>

          {/* (basic placeholder for crop) */}
          <button className="profile-btn crop-btn">
            Crop Image (coming soon)
          </button>
        </div>

        <div className="profile-right">
          <div className="profile-header">
            <h2>Profile Details</h2>
          </div>

          <div className="profile-form">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="form-group full-width">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group full-width">
              <label>Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Write something about yourself"
              ></textarea>
            </div>
          </div>

          <div className="profile-actions">
            <button onClick={handleSave} className="profile-btn save-btn">
              Save Details
            </button>

            <button onClick={()=>{
route.push("./Dashboard")
            }} className="profile-btn cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;