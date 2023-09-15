import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../Auth/LoginButton";
import LogoutButton from "../Auth/LogoutButton";

export default function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();

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
        backgroundColor: "whitesmoke",
      }}
    >
      {isAuthenticated ? (
        <div>
          <div style={{ display: "flex", marginBottom: "15px" }}>
            <img
              src={user.picture}
              alt={user.name}
              style={{ marginRight: "15px" }}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
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
