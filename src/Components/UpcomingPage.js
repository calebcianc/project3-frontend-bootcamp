import MapItinerary from "./MapItinerary";

export default function UpcomingPage({
  itineraryActivities,
  setItineraryActivities,
  selectedItinerary,
  setSelectedItinerary,
  isHighlighted,
  setHighlighted,
  handleOnCardClick,
  userId,
  setDataChanged,
  dataChanged,
  setValue,
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
        setItineraryActivities={setItineraryActivities}
        isHighlighted={isHighlighted}
        setHighlighted={setHighlighted}
        handleOnCardClick={handleOnCardClick}
        userId={userId}
        setDataChanged={setDataChanged}
        dataChanged={dataChanged}
        setValue={setValue}
      />
    </div>
  );
}
