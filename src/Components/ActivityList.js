import { Button } from "@mui/material";
import ActivityCard from "./ActivityCard";

export default function ActivityList({
  selectedItinerary,
  setSelectedItinerary,
  itineraryActivities,
}) {
  const handleGoBack = () => {
    setSelectedItinerary(null);
  };

  return (
    <div style={{ overflow: "auto" }}>
      <div style={{ display: "flex" }}>
        <Button onClick={handleGoBack}>Go back</Button>
      </div>
      Activity List
      <br />
      GPT output: {JSON.stringify(itineraryActivities)}
      <br />
      <ActivityCard />
    </div>
  );
}
