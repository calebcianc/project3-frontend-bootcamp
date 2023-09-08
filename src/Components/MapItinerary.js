import LeftContainer from "./LeftContainer";
import RightContainer from "./RightContainer";

export default function MapItinerary({
  selectedItinerary,
  setSelectedItinerary,
  itineraryActivities,
  isHighlighted,
  setHighlighted,
  handleOnCardClick,
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
              isHighlighted={isHighlighted}
              setHighlighted={setHighlighted}
              handleOnCardClick={handleOnCardClick}
            />
          </div>
          <div className="scrollable-right-container ">
            <RightContainer
              selectedItinerary={selectedItinerary}
              setSelectedItinerary={setSelectedItinerary}
              itineraryActivities={itineraryActivities}
              isHighlighted={isHighlighted}
              setHighlighted={setHighlighted}
              handleOnCardClick={handleOnCardClick}
            />
          </div>
        </div>
      ) : (
        <div>Nothing to display</div>
      )}
    </div>
  );
}
