"use client";

import { useState } from "react";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Config/config"; 
import { useRouter } from "next/navigation";

function Page() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter()

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { email, password } = formData;

    try {
      setLoading(true);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("Login successful:", userCredential.user);

      setFormData({
        email: "",
        password: "",
      });

      router.push("./Dashboard")
      
    } catch (err) {
      console.error(err);

      if (err.code === "auth/invalid-credential") {
        setError("Invalid email or password");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email address");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Login with Google");
  };

  const handleGithubLogin = () => {
    console.log("Login with GitHub");
  };

  return (
    <div className="login">
      <div className="login-box">
        <h2>Welcome Back</h2>
        <p className="login-subtext">Sign in to continue</p>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="divider">
          <span>or</span>
        </div>

        <div className="social-login">
          <button
            type="button"
            className="social-btn"
            onClick={handleGoogleLogin}
          >
            Sign In with Google
          </button>

          <button
            type="button"
            className="social-btn"
            onClick={handleGithubLogin}
          >
            Sign In with GitHub
          </button>
        </div>

        <p className="signup-text">
          Don&apos;t have an account? <Link href="/SignUp">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Page;