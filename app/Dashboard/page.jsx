"use client";
import SideBar from "../componennts/SideBar/SideBar";
import Header from "../componennts/Header/Header";
import { useEffect, useState } from "react";
import { Builder } from "xml2js";

function Page() {
  const [data, setData] = useState("");
  const [convertedData, setConvertedData] = useState("");
  const [copy, setCopy] = useState(false);

  const xmlData = (event) => {
    const value = event.target.value;
    setData(value);
    console.log(value);
  };

  const handleConvert = () => {
    try {
      const jsonData = JSON.parse(data);
      const builder = new Builder();

      const xml = Array.isArray(jsonData)
        ? builder.buildObject({ root: { item: jsonData } })
        : builder.buildObject({ root: jsonData });

      setConvertedData(xml);
    } catch (error) {
      console.log("Invalid JSON");
      console.error(error);
    }
  };

  const copyText = () => {
    navigator.clipboard.writeText(convertedData);
    setCopy(!copy);
  };



 
  return (
    <div className="dashboard">
      <SideBar />

      <div className="main">
        <Header />

        <div className="content-wrapper">
          <div className="content">
            <h2>API Data Converter</h2>

            <div className="converter">
              <textarea
                value={data}
                onChange={xmlData}
                placeholder="Paste API JSON here"
              ></textarea>

              <textarea
                value={convertedData}
                placeholder="Converted output"
                 readOnly
              ></textarea>
            </div>

            <div className="controls">
              <select>
                <option>JSON → CSV</option>
                <option>JSON → XML</option>
              </select>

              <button onClick={handleConvert}>Convert</button>
              <button>Download</button>
              {convertedData ? (
                <button onClick={copyText} className="copyCode">
                  {copy ? "copied" : "Copy Code"}
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
