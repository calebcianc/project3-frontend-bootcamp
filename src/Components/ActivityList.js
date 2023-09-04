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

export default function ActivityList({
  itinerary,
  selectedItinerary,
  setSelectedItinerary,
  itineraryActivities,
  itineraryPhoto,
}) {
  const handleGoBack = () => {
    setSelectedItinerary(null);
  };

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

      <CardMedia
        component="img"
        sx={{
          height: "140px",
          objectFit: "cover",
        }}
        image={itineraryPhoto ? itineraryPhoto : null}
        // title={itineraryPhoto.name}
      />

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
                <div key={index}>
                  <ActivityCard activity={activity} />
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
