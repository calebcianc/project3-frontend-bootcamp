import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import ExploreIcon from "@mui/icons-material/Explore";
import UpcomingIcon from "@mui/icons-material/Upcoming";
import ArchiveIcon from "@mui/icons-material/Archive";

export default function BottomNavbar() {
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
      // value={value}
      // onChange={(event, newValue) => {
      //   setValue(newValue);
      // }}
    >
      <BottomNavigationAction label="Explore" icon={<ExploreIcon />} />
      <BottomNavigationAction label="Upcoming" icon={<UpcomingIcon />} />
      <BottomNavigationAction label="Past" icon={<ArchiveIcon />} />
    </BottomNavigation>
  );
}
