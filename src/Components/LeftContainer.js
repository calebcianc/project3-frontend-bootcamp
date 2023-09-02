import ItineraryMap from "./ItineraryMap";

export default function LeftContainer({ selectedItinerary }) {
  return (
    <div>
      {/* Left Container */}
      {/* if itinerary is selected, render map */}
      {/* if itnerary is not selected, render picture of next itinerary */}
      {selectedItinerary ? <ItineraryMap /> : <div>nothing</div>}
    </div>
  );
}
