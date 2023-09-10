import { Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

export default function DownloadItineraryButton() {
  const handleDownloadItinerary = () => {
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
        <Button
          endIcon={<FileDownloadIcon />}
          onClick={handleDownloadItinerary}
        >
          Download
        </Button>
      </div>
    </div>
  );
}
