import ItineraryCard from "./ItineraryCard";

export default function ItineraryList({ itineraryActivities }) {
  return (
    <div>
      {itineraryActivities.map((itinerary, index) => (
        <ItineraryCard key={index} itinerary={itinerary} />
      ))}
    </div>
  );
}
