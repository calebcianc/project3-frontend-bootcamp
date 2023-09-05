import Map from "./Map";

export default function LeftContainer({
  selectedItinerary,
  itineraryActivities,
}) {
  return (
    <div style={{ minWidth: "100%" }}>
      {/* Left Container */}

      <Map itineraryActivities={itineraryActivities} />
      {/* {selectedItinerary ? (
      ) : (
        <Map itineraryActivities={itineraryActivities} />
      )} */}
      {/* <div>nothing</div> */}
    </div>
  );
}
