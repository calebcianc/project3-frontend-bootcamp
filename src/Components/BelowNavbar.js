import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../constants.js";
import "../App.css";
import ItineraryOptionsButton from "./ItineraryOptionsButton";
import ExplorePage from "./ExplorePage.js";
import UpcomingPage from "./UpcomingPage.js";
import PastPage from "./PastPage.js";

export default function BelowNavbar({
  type,
  selectedItinerary,
  setSelectedItinerary,
}) {
  const [itineraryActivities, setItineraryActivities] = useState([]);

  const [isHighlighted, setHighlighted] = useState(null);
  const handleOnCardClick = (card) => {
    if (isHighlighted === card.id) {
      setHighlighted(null);
    } else {
      setHighlighted(card.id);
    }
  };

  // Caleb: introduced a type prop to tweak the itineraries shown based on the selected tab.
  // e.g., if type="explore", to only show itineraries which user is not a part of

  const userId = 2; // to remove

  useEffect(() => {
    let apiEndpoint;

    switch (type) {
      case "explore":
        apiEndpoint = userId
          ? `${BACKEND_URL}/itinerary/explore/${userId}`
          : `${BACKEND_URL}/itinerary/explore`;

        axios.get(apiEndpoint).then((response) => {
          setItineraryActivities(response.data);
        });
        break;

      case "upcoming":
      case "past":
        apiEndpoint = `${BACKEND_URL}/itinerary/${userId}`;
        axios.get(apiEndpoint).then((response) => {
          // setItineraryActivities(response.data);
          console.log(response.data[0].prompts.startDate);
          const today = new Date();
          const filteredData = response.data.filter((activity) => {
            const endDate = new Date(activity.prompts.endDate);
            return type === "upcoming" ? endDate >= today : endDate < today;
          });
          console.log("today", today);
          console.log("filteredData", filteredData);
          setItineraryActivities(filteredData);
        });
        break;

      default:
        apiEndpoint = `${BACKEND_URL}/itinerary/${userId}`;
        axios.get(apiEndpoint).then((response) => {
          setItineraryActivities(response.data);
        });
        break;
    }
  }, [type]);

  return (
    <div
      style={{
        maxWidth: "1280px",
        margin: "0 auto",
      }}
    >
      {/* if there are itineraries, render 2 components: left container to display picture, right container to display list of itineraries */}
      {/* if no itinerary, render button for user to add itinerary  */}
      {type === "explore" ? (
        <ExplorePage
          selectedItinerary={selectedItinerary}
          setSelectedItinerary={setSelectedItinerary}
          itineraryActivities={itineraryActivities}
          isHighlighted={isHighlighted}
          setHighlighted={setHighlighted}
          handleOnCardClick={handleOnCardClick}
        />
      ) : type === "upcoming" ? (
        <UpcomingPage
          selectedItinerary={selectedItinerary}
          setSelectedItinerary={setSelectedItinerary}
          itineraryActivities={itineraryActivities}
          isHighlighted={isHighlighted}
          setHighlighted={setHighlighted}
          handleOnCardClick={handleOnCardClick}
        />
      ) : (
        <PastPage
          selectedItinerary={selectedItinerary}
          setSelectedItinerary={setSelectedItinerary}
          itineraryActivities={itineraryActivities}
          isHighlighted={isHighlighted}
          setHighlighted={setHighlighted}
          handleOnCardClick={handleOnCardClick}
        />
      )}

      {selectedItinerary ? null : (
        <ItineraryOptionsButton
          option="add"
          itineraryActivities={itineraryActivities}
          setItineraryActivities={setItineraryActivities}
          setSelectedItinerary={setSelectedItinerary}
        />
      )}
    </div>
  );
}
