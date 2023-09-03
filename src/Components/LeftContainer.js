import Map from "./Map";

export default function LeftContainer({ selectedItinerary }) {
  return (
    <div>
      {/* Left Container */}
      {/* if itinerary is selected, render map */}
      {/* if itnerary is not selected, render picture of next itinerary */}
      {selectedItinerary ? <Map /> : <div>nothing</div>}
    </div>
  );
}
