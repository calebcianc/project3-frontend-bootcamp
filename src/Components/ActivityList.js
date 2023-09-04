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
    <div
      style={{
        maxHeight: "calc(100vh - 64px - 56px )",
        overflow: "auto",
      }}
    >
      <div style={{ display: "flex" }}>
        <Button onClick={handleGoBack}>Go back</Button>
      </div>
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
  );
}

{
  /* <ActivityCard activity={activity}></ActivityCard>; */
}
