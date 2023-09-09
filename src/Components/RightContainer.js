import ActivityList from "./ActivityList";
import ItineraryList from "./ItineraryList";
import RightContainerFilterButton from "./RightContainerFilterButton";

export default function RightContainer({
  selectedItinerary,
  setSelectedItinerary,
  itineraryActivities,
  itineraryPhoto,
  setItineraryPhoto,
  isHighlighted,
  setHighlighted,
  handleOnCardClick,
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
          isHighlighted={isHighlighted}
          setHighlighted={setHighlighted}
          handleOnCardClick={handleOnCardClick}
        />
      ) : (
        <div
          style={{
            maxHeight: "calc(100vh - 64px - 56px )",
            overflow: "auto",
          }}
        >
          <RightContainerFilterButton />
          <ItineraryList
            selectedItinerary={selectedItinerary}
            setSelectedItinerary={setSelectedItinerary}
            itineraryActivities={itineraryActivities}
            setItineraryPhoto={setItineraryPhoto}
            isHighlighted={isHighlighted}
            setHighlighted={setHighlighted}
            handleOnCardClick={handleOnCardClick}
          />
        </div>
      )}
    </div>
  );
}
