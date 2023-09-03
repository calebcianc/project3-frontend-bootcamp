import ActivityList from "./ActivityList";
import ItineraryList from "./ItineraryList";
import RightContainerFilterButton from "./RightContainerFilterButton";

export default function RightContainer({
  selectedItinerary,
  itineraryActivities,
}) {
  return (
    <div
      style={{
        width: "50%",
        height: "calc(100vh - 64px - 56px)",
        backgroundColor: "whitesmoke",
        padding: "10px",
      }}
    >
      <div style={{ textAlign: "center" }}>Right Container</div>
      {/* if itinerary is selected, render list of activities */}
      {/* if itnerary is not selected, render list of itineraries */}
      {selectedItinerary ? (
        <ActivityList itineraryActivities={itineraryActivities} />
      ) : (
        <div>
          <RightContainerFilterButton />
          <ItineraryList />
        </div>
      )}
    </div>
  );
}
