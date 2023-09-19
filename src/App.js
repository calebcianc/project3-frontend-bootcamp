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
import Profile from "./Profile/Profile";
import { BACKEND_URL } from "./constants.js";
import { useAuth0 } from "@auth0/auth0-react";
import GoogleInitialisation from "./Auth/GoogleInitialisation";

export const AccessTokenContext = createContext();
export const CurrUserContext = createContext();

const App = () => {
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const [currUser, setCurrUser] = useState("");
  const { user, isAuthenticated, getAccessTokenSilently, loginWithRedirect } =
    useAuth0();
  const [accessToken, setAccessToken] = useState("");
  const [value, setValue] = useState(isAuthenticated ? "upcoming" : "explore");

  useEffect(() => {
    if (isAuthenticated && user) {
      getUserApi();
    }
  }, [isAuthenticated]);

  // get user
  const getUserApi = async () => {
    let token = await getAccessTokenSilently();
    // check user
    let request = await axios.post(
      `${BACKEND_URL}/user`,
      {
        email: user.email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(request);
    setAccessToken(token);
    setCurrUser(request.data);
  };

  // if unauthenticated, app initialises the explore page. but midway if the user gets authenticated, the app directs to the upcoming page and the bottom upcoming icon gets updated as well
  useEffect(() => {
    if (isAuthenticated) {
      setValue("upcoming");
    }
    console.log(`isAuthenticated: ${isAuthenticated}`);
  }, [isAuthenticated]);

  return (
    <>
      <AccessTokenContext.Provider value={accessToken}>
        <CurrUserContext.Provider value={currUser}>
          <Router>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div>
                <Navbar
                  value={value}
                  setValue={setValue}
                  isAuthenticated={isAuthenticated}
                />

                <Routes>
                  <Route
                    path="/"
                    element={
                      <BelowNavbar
                        type={isAuthenticated ? "upcoming" : "explore"}
                        selectedItinerary={selectedItinerary}
                        setSelectedItinerary={setSelectedItinerary}
                        value={value}
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
                        value={value}
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
                        value={value}
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
                        value={value}
                        setValue={setValue}
                      />
                    }
                  />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/credits" element={<Credits />} />
                  <Route
                    path="/googleInitialisation"
                    element={
                      <GoogleInitialisation
                        selectedItinerary={selectedItinerary}
                      />
                    }
                  />
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
      </AccessTokenContext.Provider>
    </>
  );
};

export default App;
