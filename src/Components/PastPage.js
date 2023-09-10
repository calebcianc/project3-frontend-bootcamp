import ItineraryIcon from "./ItineraryIcon";
import MapItinerary from "./MapItinerary";

export default function PastPage({
  itineraryActivities,
  selectedItinerary,
  setSelectedItinerary,
  isHighlighted,
  setHighlighted,
  handleOnCardClick,
}) {
  console.log("itineraryActivities: ", { itineraryActivities });

  if (itineraryActivities && itineraryActivities.length === 0) {
    return <div style={{ textAlign: "center" }}>No Past Itineraries</div>;
  }
  return (
    <div className="icon-container">
      {selectedItinerary ? (
        <MapItinerary
          selectedItinerary={selectedItinerary}
          setSelectedItinerary={setSelectedItinerary}
          itineraryActivities={itineraryActivities}
          isHighlighted={isHighlighted}
          setHighlighted={setHighlighted}
          handleOnCardClick={handleOnCardClick}
        />
      ) : (
        itineraryActivities.map((itinerary, index) => (
          <ItineraryIcon
            key={itinerary.id}
            itineraryId={itinerary.id}
            photoUrl={itinerary.photoUrl}
            name={itinerary.name}
            country={itinerary.prompts.country}
            selectedItinerary={selectedItinerary}
            setSelectedItinerary={setSelectedItinerary}
            itineraryActivities={itineraryActivities}
          />
        ))
      )}
    </div>
  );
}
