import Map from "./Map";

export default function LeftContainer({
  selectedItinerary,
  itineraryActivities,
  isHighlighted,
  setHighlighted,
  handleOnCardClick,
}) {
  return (
    <div style={{ minWidth: "100%" }}>
      {/* Left Container */}

      <Map
        selectedItinerary={selectedItinerary}
        itineraryActivities={itineraryActivities}
        isHighlighted={isHighlighted}
        setHighlighted={setHighlighted}
        handleOnCardClick={handleOnCardClick}
      />
      {/* {selectedItinerary ? (
      ) : (
        <Map itineraryActivities={itineraryActivities} />
      )} */}
      {/* <div>nothing</div> */}
    </div>
  );
}
