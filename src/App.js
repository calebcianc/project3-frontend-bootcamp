import React from "react";
import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import BelowNavbar from "./Components/BelowNavbar";
import BottomNavbar from "./Components/BottomNavbar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Credits from "./Credits/Credits";
import { BACKEND_URL } from "./constants.js";

export const CurrUserContext = createContext();

const App = () => {
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const [value, setValue] = useState("upcoming");
  const [currUser, setCurrUser] = useState("");
  // const [accessToken, setAccessToken] = useState("");

  // get user
  const checkUser = async () => {
    // let token = await getAccessTokenSilently();
    // setAccessToken(token);

    // use user.email to find user details
    const email = "barbie.pink@gmail.com";
    axios
      .post(`${BACKEND_URL}/user`, {
        email: email,
      })
      .then((res) => {
        console.log(res.data);
        setCurrUser(res.data);
      });
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      <CurrUserContext.Provider value={currUser}>
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
                      setValue={setValue}
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
                      setValue={setValue}
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
                      setValue={setValue}
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
      </CurrUserContext.Provider>
    </>
  );
};

export default App;
