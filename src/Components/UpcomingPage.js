import MapItinerary from "./MapItinerary";

export default function UpcomingPage({
  itineraryActivities,
  selectedItinerary,
  setSelectedItinerary,
  isHighlighted,
  setHighlighted,
  handleOnCardClick,
}) {
  if (itineraryActivities && itineraryActivities.length === 0) {
    return <div style={{ textAlign: "center" }}>No upcoming Itineraries</div>;
  }

  return (
    <div>
      <MapItinerary
        selectedItinerary={selectedItinerary}
        setSelectedItinerary={setSelectedItinerary}
        itineraryActivities={itineraryActivities}
        isHighlighted={isHighlighted}
        setHighlighted={setHighlighted}
        handleOnCardClick={handleOnCardClick}
      />
    </div>
  );
}
