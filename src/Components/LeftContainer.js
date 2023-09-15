import Map from "./Map";

export default function LeftContainer({
  selectedItinerary,
  itineraryActivities,
  isHighlighted,
  setHighlighted,
  handleOnCardClick,
  appliedFilters,
  setAppliedFilters,
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
        appliedFilters={appliedFilters}
        setAppliedFilters={setAppliedFilters}
      />
      {/* {selectedItinerary ? (
      ) : (
        <Map itineraryActivities={itineraryActivities} />
      )} */}
      {/* <div>nothing</div> */}
    </div>
  );
}
