import ItineraryIcon from "./ItineraryIcon";

export default function PastPage({
  itineraryActivities,
  selectedItinerary,
  setSelectedItinerary,
}) {
  return (
    <div>
      Past page
      <ItineraryIcon
        selectedItinerary={selectedItinerary}
        setSelectedItinerary={setSelectedItinerary}
        itineraryActivities={itineraryActivities}
      />
    </div>
  );
}
