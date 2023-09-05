import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import BelowNavbar from "./Components/BelowNavbar";
import BottomNavbar from "./Components/BottomNavbar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Credits from "./Credits/Credits";

const App = () => {
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const [value, setValue] = useState("upcoming");

  return (
    <Router>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div>
          <Navbar value={value} setValue={setValue} />

          <Routes>
            <Route
              path="/"
              element={
                <BelowNavbar
                  type="upcoming"
                  selectedItinerary={selectedItinerary}
                  setSelectedItinerary={setSelectedItinerary}
                />
              }
            />
            <Route
              path="/explore"
              element={
                <BelowNavbar
                  type="explore"
                  selectedItinerary={selectedItinerary}
                  setSelectedItinerary={setSelectedItinerary}
                />
              }
            />
            <Route
              path="/upcoming"
              element={
                <BelowNavbar
                  type="upcoming"
                  selectedItinerary={selectedItinerary}
                  setSelectedItinerary={setSelectedItinerary}
                />
              }
            />
            <Route
              path="/past"
              element={
                <BelowNavbar
                  type="past"
                  selectedItinerary={selectedItinerary}
                  setSelectedItinerary={setSelectedItinerary}
                />
              }
            />
            <Route path="/credits" element={<Credits />} />
          </Routes>

          <BottomNavbar
            setSelectedItinerary={setSelectedItinerary}
            value={value}
            setValue={setValue}
          />
        </div>
      </LocalizationProvider>
    </Router>
  );
};

export default App;
