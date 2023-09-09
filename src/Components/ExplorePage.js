import ItineraryIcon from "./ItineraryIcon";
import MapItinerary from "./MapItinerary";

export default function ExplorePage({
  itineraryActivities,
  selectedItinerary,
  setSelectedItinerary,
  isHighlighted,
  setHighlighted,
  handleOnCardClick,
}) {
  if (itineraryActivities && itineraryActivities.length === 0) {
    return <div style={{ textAlign: "center" }}>No Public Itineraries</div>;
  }
  return (
    <div>
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
        <div className="icon-container">
          {itineraryActivities.map((itinerary, index) =>
            itinerary.users.length < itinerary.maxPax ? (
              <ItineraryIcon
                key={itinerary.id}
                itineraryId={itinerary.id}
                itinerary={itinerary}
                setSelectedItinerary={setSelectedItinerary}
              />
            ) : null
          )}
        </div>
      )}
    </div>
  );
}
