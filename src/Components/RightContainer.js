import ActivityList from "./ActivityList";
import ItineraryList from "./ItineraryList";
import RightContainerFilterButton from "./RightContainerFilterButton";

export default function RightContainer({ selectedItinerary }) {
  return (
    <div>
      Right Container
      {/* if itinerary is selected, render list of activities */}
      {/* if itnerary is not selected, render list of itineraries */}
      {selectedItinerary ? (
        <ActivityList />
      ) : (
        <div>
          <RightContainerFilterButton />
          <ItineraryList />
        </div>
      )}
    </div>
  );
}
