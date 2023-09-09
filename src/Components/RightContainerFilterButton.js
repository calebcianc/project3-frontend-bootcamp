import { Button } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

export default function RightContainerFilterButton() {
  const handleFilterItinerary = () => {
    return alert("test");
  };
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          marginLeft: "auto",
          // marginTop: "4mm",
          marginRight: "4mm",
        }}
      >
        <Button endIcon={<FilterAltIcon />} onClick={handleFilterItinerary}>
          Filter
        </Button>
      </div>
    </div>
  );
}
