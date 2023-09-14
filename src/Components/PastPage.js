import ItineraryIcon from "./ItineraryIcon";
import MapItinerary from "./MapItinerary";

export default function PastPage({
  itineraryActivities,
  selectedItinerary,
  setSelectedItinerary,
  isHighlighted,
  setHighlighted,
  handleOnCardClick,
  value,
  setValue,
}) {
  console.log("itineraryActivities: ", { itineraryActivities });

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
        <em>There are past itineraries available for you to view</em>
      </div>
    );
  }
  return (
    <div>
      {selectedItinerary ? (
        <MapItinerary
          selectedItinerary={selectedItinerary}
          setSelectedItinerary={setSelectedItinerary}
          itineraryActivities={itineraryActivities}
          isHighlighted={isHighlighted}
          setHighlighted={setHighlighted}
          handleOnCardClick={handleOnCardClick}
        />
      ) : (
        <div className="icon-container">
          {itineraryActivities.map((itinerary, index) => (
            <ItineraryIcon
              // key={itinerary.id}
              // itineraryId={itinerary.id}
              // photoUrl={itinerary.photoUrl}
              // name={itinerary.name}
              // country={itinerary.prompts.country}
              // selectedItinerary={selectedItinerary}
              // setSelectedItinerary={setSelectedItinerary}
              // itineraryActivities={itineraryActivities}
              key={itinerary.id}
              itineraryId={itinerary.id}
              itinerary={itinerary}
              setSelectedItinerary={setSelectedItinerary}
              value={value}
              setValue={setValue}
            />
          ))}
        </div>
      )}
    </div>
  );
}
