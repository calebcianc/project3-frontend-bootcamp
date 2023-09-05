import { useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import ExploreIcon from "@mui/icons-material/Explore";
import UpcomingIcon from "@mui/icons-material/Upcoming";
import ArchiveIcon from "@mui/icons-material/Archive";

export default function BottomNavbar() {
  const [value, setValue] = useState("upcoming");
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(`/${newValue}`);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        zIndex: 2,
        width: "100%",
      }}
    >
      <BottomNavigation
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          justifyContent: "space-around",
          // backgroundColor: "gray",
        }}
        showLabels
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          label="Explore"
          value="explore"
          icon={<ExploreIcon />}
        />
        <BottomNavigationAction
          label="Upcoming"
          value="upcoming"
          icon={<UpcomingIcon />}
        />
        <BottomNavigationAction
          label="Past"
          value="past"
          icon={<ArchiveIcon />}
        />
      </BottomNavigation>
    </div>
  );
}
