import Map from "./Map";

export default function LeftContainer({ selectedItinerary }) {
  return (
    <div
      style={{
        width: "50%",
        height: "calc(100vh - 64px - 56px)",
      }}
    >
      {/* <div style={{ textAlign: "center" }}>Left Container</div> */}

      {/* if itinerary is selected, render map */}
      {/* if itnerary is not selected, render picture of next itinerary */}
      {selectedItinerary ? (
        <Map />
      ) : (
        <p>Render picture of upcoming itinerary</p>
      )}
    </div>
  );
}
