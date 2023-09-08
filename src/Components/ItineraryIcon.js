import { Box, Typography, Tooltip } from "@mui/material";

export default function ItineraryIcon({
  itineraryId,
  itinerary,
  setSelectedItinerary,
}) {
  const handleSelectItinerary = () => {
    setSelectedItinerary(itineraryId);
  };
  return (
    <div onClick={handleSelectItinerary}>
      <Tooltip
        title={`${itinerary.name} | Max Pax: ${itinerary.maxPax} | Gender Preference: ${itinerary.genderPreference}`}
        arrow
      >
        <Box
          sx={{
            width: 150,
            height: 150,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: `url(${itinerary.photoUrl})`,
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
            {itinerary.prompts.country}
          </Typography>
        </Box>
      </Tooltip>
    </div>
  );
}
