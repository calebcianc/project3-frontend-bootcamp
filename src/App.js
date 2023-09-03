import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import BelowNavbar from "./Components/BelowNavbar";
import BottomNavbar from "./Components/BottomNavbar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
class App extends React.Component {
  render() {
    return (
      <Router>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div>
            <Navbar />

            <Routes>
              <Route path="/" element={<BelowNavbar type="upcoming" />} />
              <Route path="/explore" element={<BelowNavbar type="explore" />} />
              <Route
                path="/upcoming"
                element={<BelowNavbar type="upcoming" />}
              />
              <Route path="/past" element={<BelowNavbar type="past" />} />
            </Routes>

            <BottomNavbar />
          </div>
        </LocalizationProvider>
      </Router>
    );
  }
}

export default App;
