"use client";

import { useState } from "react";
import "./Reader.css";

function ApiReader() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!url) return;

    try {
      setLoading(true);
      setError("");
      const res = await fetch(url);
      const json = await res.json();

      setData(json);
    } catch (err) {
      setError("Failed to fetch API data.");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const renderValue = (value, key = "") => {
    if (Array.isArray(value)) {
      return (
        <div className="api-block" key={key}>
          <h4>{key}</h4>
          {value.map((item, index) => (
            <div className="api-item" key={index}>
              {typeof item === "object" ? (
                renderObject(item)
              ) : (
                <p>{String(item)}</p>
              )}
            </div>
          ))}
        </div>
      );
    }

    if (typeof value === "object" && value !== null) {
      return (
        <div className="api-block" key={key}>
          <h4>{key}</h4>
          {renderObject(value)}
        </div>
      );
    }

    return (
      <p key={key}>
        <strong>{key}:</strong> {String(value)}
      </p>
    );
  };

  const renderObject = (obj) => {
    return Object.entries(obj).map(([key, value]) => renderValue(value, key));
  };

  return (
    <div className="api-reader">
      <div className="api-top">
        <input
          type="text"
          placeholder="Paste API URL here"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchData()}
        />
        <button onClick={fetchData}>Send</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {data && (
        <div className="response-section">
          <h3>Response Data</h3>
          <div className="response-box">
            {typeof data === "object" ? (
              renderObject(data)
            ) : (
              <p>{String(data)}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ApiReader;
