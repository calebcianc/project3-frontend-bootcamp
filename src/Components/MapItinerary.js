import LeftContainer from "./LeftContainer";
import RightContainer from "./RightContainer";

export default function MapItinerary({
  selectedItinerary,
  setSelectedItinerary,
  itineraryActivities,
  setItineraryActivities,
  isHighlighted,
  setHighlighted,
  handleOnCardClick,
  userId,
  setDataChanged,
  dataChanged,
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
              setItineraryActivities={setItineraryActivities}
              isHighlighted={isHighlighted}
              setHighlighted={setHighlighted}
              handleOnCardClick={handleOnCardClick}
              userId={userId}
              setDataChanged={setDataChanged}
              dataChanged={dataChanged}
            />
          </div>
        </div>
      ) : (
        <div>Nothing to display</div>
      )}
    </div>
  );
}
