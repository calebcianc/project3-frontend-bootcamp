import { useState } from "react";
import LeftContainer from "./LeftContainer";
import RightContainer from "./RightContainer";
import ItineraryOptionsButton from "./ItineraryOptionsButton";

export default function BelowNavbar() {
  const [itineraries, setItineraries] = useState(true);
  const [selectedItinerary, setselectedItinerary] = useState(true);
  const [itineraryActivities, setItineraryActivities] = useState(null);

  return (
    <div style={{ height: "calc(100vh - 64px - 56px)" }}>
      {/* <p style={{ margin: "0" }}>BelowNavbar</p>
      <p>Itineraries: {itineraries ? "True" : "False"}</p>
      <p>SelectedItinerary: {selectedItinerary ? "True" : "False"}</p> */}

      {/* if there are itineraries, render 2 components: left container to display picture, right container to display list of itineraries */}
      {/* if no itinerary, render button for user to add itinerary  */}

      {itineraries ? (
        <div style={{ display: "flex" }}>
          <LeftContainer selectedItinerary={selectedItinerary} />
          <RightContainer
            selectedItinerary={selectedItinerary}
            itineraryActivities={itineraryActivities}
          />
        </div>
      ) : null}

      <ItineraryOptionsButton
        option="add"
        itineraryActivities={itineraryActivities}
        setItineraryActivities={setItineraryActivities}
      />
    </div>
  );
}
