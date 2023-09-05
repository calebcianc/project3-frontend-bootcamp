import LeftContainer from "./LeftContainer";
import RightContainer from "./RightContainer";

export default function MapItinerary({
  selectedItinerary,
  setSelectedItinerary,
  itineraryActivities,
}) {
  return (
    <div>
      {itineraryActivities.length > 0 ? (
        <div className="BelowNavBar-Container">
          <div>
            {" "}
            <LeftContainer
              selectedItinerary={selectedItinerary}
              itineraryActivities={itineraryActivities}
            />
          </div>
          <div className="scrollable-right-container ">
            <RightContainer
              selectedItinerary={selectedItinerary}
              setSelectedItinerary={setSelectedItinerary}
              itineraryActivities={itineraryActivities}
            />
          </div>
        </div>
      ) : (
        <div>Nothing to display</div>
      )}
    </div>
  );
}
