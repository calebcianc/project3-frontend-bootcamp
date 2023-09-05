import LeftContainer from "./LeftContainer";
import RightContainer from "./RightContainer";
import { useState } from "react";

export default function MapItinerary({
  selectedItinerary,
  setSelectedItinerary,
  itineraryActivities,
}) {
  const [itineraryPhoto, setItineraryPhoto] = useState(null);
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
              setItineraryPhoto={setItineraryPhoto}
              itineraryPhoto={itineraryPhoto}
            />
          </div>
        </div>
      ) : (
        <div>Nothing to display</div>
      )}
    </div>
  );
}
