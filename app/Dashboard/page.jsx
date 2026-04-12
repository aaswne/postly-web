"use client";
import SideBar from "../componennts/SideBar/SideBar";
import NavBar from "../componennts/NavBar/NavBar"
import Footer from "../componennts/Footer/Footer"
import { useState } from "react";
import { Builder } from "xml2js";

function Page() {
  const [data, setData] = useState("");
  const [convertedData, setConvertedData] = useState("");
  const [copy, setCopy] = useState(false);
  const [convertTo, setConvertTo] = useState("xml"); // default


  // select change
  const optionsClick = (e) => {
    setConvertTo(e.target.value);
  };

  // input change
  const xmlData = (event) => {
    setData(event.target.value);
  };

  // convert button
  const handleConvert = () => {
    try {
      const jsonData = JSON.parse(data);

      // XML conversion
      if (convertTo === "xml") {
        const builder = new Builder();

        const xml = Array.isArray(jsonData)
          ? builder.buildObject({ root: { item: jsonData } })
          : builder.buildObject({ root: jsonData });

        setConvertedData(xml);
      }

      // CSV conversion
      else if (convertTo === "csv") {
        if (!Array.isArray(jsonData)) {
          alert("CSV works only with array of objects");
          return;
        }

        const keys = Object.keys(jsonData[0]);

        const rows = jsonData.map((obj) =>
          keys.map((key) => obj[key]).join(",")
        );

        const csv = [keys.join(","), ...rows].join("\n");

        setConvertedData(csv);
      }
    } catch (error) {
      console.log("Invalid JSON");
      console.error(error);
    }
  };

  // copy
  const copyText = () => {
    navigator.clipboard.writeText(convertedData);
    setCopy(true);

    setTimeout(() => {
      setCopy(false);
    }, 2000);
  };

//   DOWNLODE

const handleDownload = () => {
  if (!convertedData) return;

  const fileType = convertTo === "xml" ? "application/xml" : "text/csv";
  const fileExtension = convertTo === "xml" ? "xml" : "csv";

  const blob = new Blob([convertedData], { type: fileType });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `converted.${fileExtension}`;

  link.click();

  URL.revokeObjectURL(url);
};

const darkModeToggle = ()=>{
setDarkMode(!darkMode)
}

  return (
    <div className="dashboard"style={{background:"#111827"}} >
      <SideBar />

      <div className="main">
<NavBar  />
        <div className="content-wrapper">
          <div className="content">
            <h2>API Data Converter</h2>

            <div className="converter">
              <textarea
                value={data}
                onChange={xmlData}
                placeholder="Paste API JSON here"
              />

              <textarea
                value={convertedData}
                placeholder="Converted output"
                readOnly
              />
            </div>

            <div className="controls">
              <select value={convertTo} onChange={optionsClick}>
                <option value="csv">JSON → CSV</option>
                <option value="xml">JSON → XML</option>
              </select>

              <button onClick={handleConvert}>Convert</button>
              <button onClick={handleDownload} >Download</button>

              {convertedData && (
                <button onClick={copyText} className="copyCode">
                  {copy ? "Copied" : "Copy Code"}
                </button>
              )}
            </div>
          </div>
        </div>
              <Footer/>

      </div>
    </div>
  );
}

export default Page;