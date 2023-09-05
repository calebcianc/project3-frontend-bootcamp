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
    <BottomNavigation
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        justifyContent: "space-around",
        zIndex: 2,
        // backgroundColor: "white",
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
  );
}
