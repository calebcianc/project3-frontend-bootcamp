import ItineraryIcon from "./ItineraryIcon";
import MapItinerary from "./MapItinerary";

export default function ExplorePage({
  itineraryActivities,
  selectedItinerary,
  setSelectedItinerary,
}) {
  return (
    <div className="icon-container">
      {/*add in condition for no itineraries*/}
      {selectedItinerary ? (
        <MapItinerary
          selectedItinerary={selectedItinerary}
          setSelectedItinerary={setSelectedItinerary}
          itineraryActivities={itineraryActivities}
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
