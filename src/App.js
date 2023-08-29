import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import BelowNavbar from "./Components/BelowNavbar";

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <BelowNavbar />
      </div>
    );
  }
}

export default App;
