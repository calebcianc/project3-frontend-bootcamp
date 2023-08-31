import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import BelowNavbar from "./Components/BelowNavbar";
import BottomNavbar from "./Components/BottomNavbar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
class App extends React.Component {
  render() {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div>
          <Navbar />
          <BelowNavbar />
          <BottomNavbar />
        </div>
      </LocalizationProvider>
    );
  }
}

export default App;
