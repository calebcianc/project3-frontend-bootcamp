import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import BelowNavbar from "./Components/BelowNavbar";
import BottomNavbar from "./Components/BottomNavbar";

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <BelowNavbar />
        <BottomNavbar />
      </div>
    );
  }
}

export default App;
