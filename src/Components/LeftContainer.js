import Map from "./Map";

export default function LeftContainer({
  selectedItinerary,
  itineraryActivities,
}) {
  return (
    <div style={{ minWidth: "100%" }}>
      {/* Left Container */}
      {/* if itinerary is selected, render map */}
      {/* if itnerary is not selected, render picture of next itinerary */}
      {selectedItinerary ? (
        <Map itineraryActivities={itineraryActivities} />
      ) : (
        <Map />
      )}
      {/* <div>nothing</div> */}
    </div>
  );
}
