import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Auth0Provider
    domain="dev-jg0bahnmapfmuy3a.us.auth0.com"
    clientId="uElytsET0JTQG0B4EoOeC16UpMmWFAlK"
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: "https://dev-jg0bahnmapfmuy3a.us.auth0.com/api/v2/",
      scope: "read:current_user update:current_user_metadata",
    }}
  >
    <App />
  </Auth0Provider>
);
