import ItineraryCard from "./ItineraryCard";

export default function ItineraryList({
  itineraryActivities,
  selectedItinerary,
  setSelectedItinerary,
}) {
  return (
    <div>
      {itineraryActivities.map((itinerary, index) => (
        <ItineraryCard
          key={itinerary.id}
          itinerary={itinerary}
          selectedItinerary={selectedItinerary}
          setSelectedItinerary={setSelectedItinerary}
        />
      ))}
    </div>
  );
}
