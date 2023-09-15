import LeftContainer from "./LeftContainer";
import RightContainer from "./RightContainer";
import { useState } from "react";

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
  setValue,
}) {
  const [appliedFilters, setAppliedFilters] = useState({
    startDate: null,
    endDate: null,
    country: null,
    category: null,
    people: null,
  });

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
              appliedFilters={appliedFilters}
              setAppliedFilters={setAppliedFilters}
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
              setValue={setValue}
              appliedFilters={appliedFilters}
              setAppliedFilters={setAppliedFilters}
            />
          </div>
        </div>
      ) : (
        <div>Nothing to display</div>
      )}
    </div>
  );
}
