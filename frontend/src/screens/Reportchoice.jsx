import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Report.css";

export default function Reportchoice() {
  let navigate = useNavigate();
  const testreportnum = useParams();

  return (
    <div>
      <Navbar />
      <div style={{ "margin-top": "5vh" }}>
        <button
          className="btn btn-info"
          type="button"
          onClick={() => {
            navigate(`/report/${testreportnum.id}/bottle`);
          }}
        >
          Cap+Container
        </button>
      </div>
      <div style={{ "margin-top": "5vh" }}>
        <button
          className="btn btn-info"
          type="button"
          onClick={() => {
            navigate(`/report/${testreportnum.id}/cap`);
          }}
        >
          Cap
        </button>
      </div>
    </div>
  );
}
