"use client";

import "./Document.css";
import { useRouter } from "next/navigation";

function Document() {
  const router = useRouter();

  const startConvert = () => {
    router.push("/Login");
  };

  return (
    <div className="document">
      <div className="content">
        <h1>One Tool for All Your Data Conversions</h1>
        <p>
          Convert, format, and manage API data like JSON and XML in seconds.
          Built for developers who want speed and simplicity.
        </p>

        <button onClick={startConvert} className="cta">
          Start Converting
        </button>
      </div>

      <div className="section">
        <h2>FOR DEVELOPERS</h2>
        <p>
          Transform API data into the format you need, clean up responses, and
          simplify your workflow in one place.
        </p>
      </div>

      <div className="cardDiv">
        <div className="card">
          <h3>Simplify your workflow</h3>
          <p>
            Clean and restructure API responses before using them in your app.
          </p>
        </div>

        <div className="card">
          <h3>All tools in one place</h3>
          <p>Format, inspect, and transform data without switching tools.</p>
        </div>
      </div>
    </div>
  );
}

export default Document;