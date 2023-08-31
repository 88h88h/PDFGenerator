import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  let navigate = useNavigate();
  return (
    <div>
      {/* NAVBAR */}
      <Navbar />
      {/* Main CONTENT STARTS */}

      <div style={{ "margin-top": "5vh" }}>
        <button
          className="btn btn-info"
          type="button"
          onClick={() => {
            navigate("/reportform");
          }}
        >
          Generate a Report
        </button>
      </div>
      <div style={{ "margin-top": "5vh" }}>
        <button
          className="btn btn-info"
          type="button"
          onClick={() => {
            navigate("/reportlist");
          }}
        >
          See Existing Reports
        </button>
      </div>
    </div>
  );
}
