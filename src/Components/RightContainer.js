import ActivityList from "./ActivityList";
import ItineraryList from "./ItineraryList";
import RightContainerFilterButton from "./RightContainerFilterButton";

export default function RightContainer({
  selectedItinerary,
  itineraryActivities,
}) {
  return (
    <div>
      {/* if itinerary is selected, render list of activities */}
      {/* if itnerary is not selected, render list of itineraries */}
      {selectedItinerary ? (
        <ActivityList itineraryActivities={itineraryActivities} />
      ) : (
        <div>
          <RightContainerFilterButton />
          <ItineraryList itineraryActivities={itineraryActivities} />
        </div>
      )}
    </div>
  );
}
