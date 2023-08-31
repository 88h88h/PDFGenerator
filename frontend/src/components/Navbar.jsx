import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  let navigate = useNavigate();
  const handleClick = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    console.log("useEffect ran");
    async function permissionCheck() {
      if (!localStorage.jwttoken) {
        navigate("/login");
        alert("Access Denied");
      }
    }
    permissionCheck();
  }, [navigate]);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <div
            className="navbar-brand"
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/home");
            }}
          >
            REPORT GENERATOR
          </div>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            <div style={{ "font-weight": "bolder" }}>
              <em>Hi, {localStorage.user} </em> &nbsp; &nbsp; &nbsp;
            </div>
            <button
              className="btn btn-danger"
              type="button"
              onClick={handleClick}
            >
              LOGOUT
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
