import MapItinerary from "./MapItinerary";

export default function ItineraryBubble({
  itineraryActivities,
  selectedItinerary,
  setSelectedItinerary,
}) {
  return (
    <div>
      Itinerary Bubble. upon click to link to mapitinerary
      <MapItinerary
        selectedItinerary={selectedItinerary}
        setSelectedItinerary={setSelectedItinerary}
        itineraryActivities={itineraryActivities}
      />
    </div>
  );
}
