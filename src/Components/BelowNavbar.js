import { useState } from "react";
import LeftContainer from "./LeftContainer";
import RightContainer from "./RightContainer";
import ItineraryOptionsButton from "./ItineraryOptionsButton";

export default function BelowNavbar() {
  const [itineraries, setItineraries] = useState(false);
  const [selectedItinerary, setselectedItinerary] = useState(false);

  return (
    <div>
      <p>BelowNavbar</p>
      <p>Itineraries: {itineraries ? "True" : "False"}</p>
      <p>SelectedItinerary: {selectedItinerary ? "True" : "False"}</p>

      {/* if there are itineraries, render 2 components: left container to display picture, right container to display list of itineraries */}
      {/* if no itinerary, render button for user to add itinerary  */}

      {itineraries ? (
        <div>
          <LeftContainer selectedItinerary={selectedItinerary} />
          <RightContainer selectedItinerary={selectedItinerary} />
        </div>
      ) : (
        <ItineraryOptionsButton option="add" />
      )}
    </div>
  );
}
