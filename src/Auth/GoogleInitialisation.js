import { useState, useEffect, useContext } from "react";
import { BACKEND_URL } from "../constants.js";
import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { AccessTokenContext, CurrUserContext } from "../App";

export default function GoogleInitialisation({
  selectedItinerary,
  setModalOpen,
}) {
  // function to handle downloading of itinerary into a google sheet
  const downloadGoogleSheet = (idToken) => {
    fetch(`${BACKEND_URL}/download/googleSheet/${selectedItinerary}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
    })
      // .then((response) => response.text()) // convert to plain text
      .then((response) => response.json())
      .then((data) => {
        console.log("Received JSON data:", data);
        window.open(data.url, "_blank");
      })
      .catch((err) => console.error(err));
  };

  // client id 873743915108-ol7ape5n62nmlmji0ngu587aa2vecmq4.apps.googleusercontent.com

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const accessToken = useContext(AccessTokenContext);

  const handleAuthorization = () => {
    if (!accessToken) {
      setModalOpen(true);
      return;
    }
    const oauth2Client = window.google.accounts.oauth2.initTokenClient({
      client_id:
        "873743915108-ol7ape5n62nmlmji0ngu587aa2vecmq4.apps.googleusercontent.com",
      scope: "https://www.googleapis.com/auth/spreadsheets",
      callback: (response) => {
        downloadGoogleSheet(response);
      },
    });
    if (oauth2Client) {
      oauth2Client.requestAccessToken();
    }
  };

  return (
    <Button startIcon={<GoogleIcon />} onClick={handleAuthorization}>
      Export
    </Button>
  );
}
