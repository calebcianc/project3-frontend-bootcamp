import { useState, useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../Auth/LoginButton";
import LogoutButton from "../Auth/LogoutButton";
import { CurrUserContext } from "../App.js";

export default function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const currUser = useContext(CurrUserContext);
  const userId = currUser.id;

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div
      style={{
        maxWidth: "1280px",
        height: "calc(100vh - 64px - 56px)",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      {isAuthenticated ? (
        <div>
          <div style={{ display: "flex", marginBottom: "15px" }}>
            <img
              src={user.picture}
              alt={currUser.firstName}
              style={{ marginRight: "15px" }}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h2>
                {currUser.firstName} {currUser.lastName}
              </h2>
              <p>{currUser.email}</p>
            </div>
          </div>
          <LogoutButton />
        </div>
      ) : (
        <LoginButton />
      )}
    </div>
  );
}
