import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Reportchoice from "./screens/Reportchoice";
import Reportform from "./screens/Reportform";
import Reportlists from "./screens/Reportlists";
import Reportbottle from "./screens/Reportbottle";
import Reportcap from "./screens/Reportcap";
import ReportCopy from "./screens/Report - Copy";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/report/:id" element={<Reportchoice />} />
            <Route exact path="/report/:id/bottle" element={<Reportbottle />} />
            <Route exact path="/report/:id/cap" element={<Reportcap />} />
            <Route exact path="/reportform" element={<Reportform />} />
            <Route exact path="/reportlist" element={<Reportlists />} />
            <Route exact path="/test/:id" element={<ReportCopy />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
