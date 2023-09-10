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
        <div>
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
