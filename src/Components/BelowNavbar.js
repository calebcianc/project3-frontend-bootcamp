import { useState, useEffect } from "react";
import LeftContainer from "./LeftContainer";
import RightContainer from "./RightContainer";
import ItineraryOptionsButton from "./ItineraryOptionsButton";
import axios from "axios";
import { BACKEND_URL } from "../constants.js";
import "../App.css";

export default function BelowNavbar({ type }) {
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const [itineraryActivities, setItineraryActivities] = useState([]);

  // Caleb: introduced a type prop to tweak the itineraries shown based on the selected tab.
  // e.g., if type="explore", to only show itineraries which user is not a part of

  const userId = 1;
  // use auth0 to retrieve email. use email to find userid
  // to change 1 to userid variable
  useEffect(() => {
    axios.get(`${BACKEND_URL}/itinerary/${userId}`).then((response) => {
      setItineraryActivities(response.data); //JSON.stringify
    });
  }, []);
  // console.log("itineraryActivities_origin", itineraryActivities[0].photoUrl);

  return (
    <div>
      {/* if there are itineraries, render 2 components: left container to display picture, right container to display list of itineraries */}
      {/* if no itinerary, render button for user to add itinerary  */}

      {itineraryActivities.length > 0 ? (
        <div className="BelowNavBar-Container">
          <div>
            {" "}
            <LeftContainer
              selectedItinerary={selectedItinerary}
              itineraryActivities={itineraryActivities}
            />
          </div>
          <div>
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

      {selectedItinerary ? null : (
        <ItineraryOptionsButton
          option="add"
          itineraryActivities={itineraryActivities}
          setItineraryActivities={setItineraryActivities}
        />
      )}
    </div>
  );
}
