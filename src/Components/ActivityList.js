import ActivityCard from "./ActivityCard";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useEffect, useRef } from "react";

export default function ActivityList({
  selectedItinerary,
  setSelectedItinerary,
  itineraryActivities,
  isHighlighted,
  setHighlighted,
  handleOnCardClick,
}) {
  const handleGoBack = () => {
    setSelectedItinerary(null);
  };

  const highlightedActivityCardRef = useRef(null); // Create reference for highlighted card
  // useEffect to cause highlighted card to scroll into view
  useEffect(() => {
    if (highlightedActivityCardRef.current) {
      highlightedActivityCardRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  });

  // extract itinerary from list based on itineraryId
  const itinerary = itineraryActivities.find(
    (item) => item.id === selectedItinerary
  );

  return (
    <div
      style={{
        maxHeight: "calc(100vh - 64px - 56px )",
        overflow: "auto",
      }}
    >
      <div style={{ display: "flex" }}>
        <Button onClick={handleGoBack}>Go back</Button>
      </div>

      <Box
        position="relative"
        sx={{
          width: "calc(100% - 8mm)",
          margin: "auto",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            height: "140px",
            objectFit: "cover",
          }}
          image={itinerary.photoUrl ? itinerary.photoUrl : null}
          title={itinerary.name}
        />
        <Box
          position="absolute"
          top={0}
          left={0}
          zIndex={1}
          color="white"
          bgcolor="rgba(0, 0, 0, 0.6)"
          p={1}
        >
          <Typography variant="h6">{itinerary.name}</Typography>
        </Box>
      </Box>

      <div style={{ overflow: "auto" }}>
        {itineraryActivities.map((element, index) => {
          const activities = element.activities;
          const filteredActivities = activities.filter(
            (activity) => activity.itineraryId === selectedItinerary
          );
          const sortedActivities = filteredActivities.sort((a, b) => {
            const dateA = new Date(a["date"]);
            const dateB = new Date(b["date"]);
            if (dateA < dateB) return -1;
            if (dateA > dateB) return 1;
            return a["activityOrder"] - b["activityOrder"];
          });
          return (
            <div key={index}>
              {sortedActivities.map((activity, index) => (
                <div
                  key={index}
                  ref={
                    activity.id === isHighlighted
                      ? highlightedActivityCardRef
                      : null
                  }
                  onClick={() => handleOnCardClick(activity)}
                >
                  <ActivityCard
                    activity={activity}
                    isHighlighted={isHighlighted}
                  />
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

{
  /* <ActivityCard activity={activity}></ActivityCard>; */
}
