import ItineraryCard from "./ItineraryCard";

export default function ItineraryList({
  itineraryActivities,
  selectedItinerary,
  setSelectedItinerary,
  setItineraryPhoto,
}) {
  return (
    <div>
      {itineraryActivities.map((itinerary, index) => (
        <ItineraryCard
          key={itinerary.id}
          itinerary={itinerary}
          setItineraryPhoto={setItineraryPhoto}
          selectedItinerary={selectedItinerary}
          setSelectedItinerary={setSelectedItinerary}
        />
      ))}
    </div>
  );
}
