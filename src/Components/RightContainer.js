import ActivityList from "./ActivityList";
import ItineraryList from "./ItineraryList";
import RightContainerFilterButton from "./RightContainerFilterButton";

export default function RightContainer({
  selectedItinerary,
  setSelectedItinerary,
  itineraryActivities,
  itineraryPhoto,
  setItineraryPhoto,
}) {
  return (
    <div style={{ maxWidth: "100%" }}>
      {/* if itinerary is selected, render list of activities */}
      {/* if itnerary is not selected, render list of itineraries */}
      {selectedItinerary ? (
        <ActivityList
          selectedItinerary={selectedItinerary}
          setSelectedItinerary={setSelectedItinerary}
          itineraryActivities={itineraryActivities}
          itineraryPhoto={itineraryPhoto}
        />
      ) : (
        <div>
          <RightContainerFilterButton />
          <ItineraryList
            selectedItinerary={selectedItinerary}
            setSelectedItinerary={setSelectedItinerary}
            itineraryActivities={itineraryActivities}
            setItineraryPhoto={setItineraryPhoto}
          />
        </div>
      )}
    </div>
  );
}
