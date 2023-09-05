import MapItinerary from "./MapItinerary";

export default function UpcomingPage({
  itineraryActivities,
  selectedItinerary,
  setSelectedItinerary,
}) {
  return (
    <div>
      Upcoming page
      <MapItinerary
        selectedItinerary={selectedItinerary}
        setSelectedItinerary={setSelectedItinerary}
        itineraryActivities={itineraryActivities}
      />
    </div>
  );
}
