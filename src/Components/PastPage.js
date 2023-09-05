import ItineraryBubble from "./ItineraryBubble";

export default function PastPage({
  itineraryActivities,
  selectedItinerary,
  setSelectedItinerary,
}) {
  return (
    <div>
      Past page
      <ItineraryBubble
        selectedItinerary={selectedItinerary}
        setSelectedItinerary={setSelectedItinerary}
        itineraryActivities={itineraryActivities}
      />
    </div>
  );
}
