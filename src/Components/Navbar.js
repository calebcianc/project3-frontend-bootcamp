import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import FlightIcon from "@mui/icons-material/Flight";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useNavigate, Link } from "react-router-dom";

export default function Navbar({ value, setValue }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/credits`);
    setValue(null);
  };

  return (
    <AppBar
      position="static"
      style={{
        maxWidth: "1280px",
        margin: "0 auto",
      }}
    >
      <Toolbar
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "black",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            color: value ? null : "yellow",
          }}
          onClick={handleClick}
        >
          <div style={{ marginRight: "10px" }}>TravelGPT</div>
          <FlightIcon />
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "10px" }}>
            <AccountCircle />
          </div>
          <MenuIcon />
        </div>
      </Toolbar>
    </AppBar>
  );
}
