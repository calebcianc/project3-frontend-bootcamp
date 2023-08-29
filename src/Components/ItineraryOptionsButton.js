// button to add, delete itinerary

export default function ItineraryOptionsButton({ option }) {
  return (
    <div>
      {/* depending on the prop, to render a button to add an itinerary or delete an itinerary */}
      {option === "add" ? (
        <div>Render generate itinerary button </div>
      ) : option === "delete" ? (
        <div>Render delete itinerary button</div>
      ) : null}
    </div>
  );
}
