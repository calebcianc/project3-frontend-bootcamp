import MapItinerary from "./MapItinerary";
import { Box, Typography, Tooltip } from "@mui/material";

export default function ItineraryBubble({
  itineraryId,
  photoUrl,
  name,
  country,
  itineraryActivities,
  selectedItinerary,
  setSelectedItinerary,
}) {
  const handleSelectItinerary = () => {
    setSelectedItinerary(itineraryId);
  };
  return (
    <div onClick={handleSelectItinerary}>
      <Tooltip title={`${name}`} arrow>
        <Box
          sx={{
            width: 150,
            height: 150,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: `url(${photoUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
        >
          <Typography
            sx={{
              position: "absolute",
              bottom: 0,
              color: "black",
              textAlign: "center",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              width: "100%",
              padding: "0.5em",
              boxSizing: "border-box",
            }}
          >
            {country}
          </Typography>
        </Box>
      </Tooltip>
    </div>
  );
}
