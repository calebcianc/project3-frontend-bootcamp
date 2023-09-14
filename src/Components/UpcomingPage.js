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
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <em>
          You have no upcoming itineraries to view - Click the button below to
          generate one!
        </em>
      </div>
    );
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
