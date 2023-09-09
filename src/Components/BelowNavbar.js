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
          if (response.data.length === 0) {
            setItineraryActivities([]); // Set to empty array
            return;
          }
          console.log(response.data[0].prompts.startDate);
          const today = new Date();
          const filteredData = response.data.filter((activity) => {
            const endDate = new Date(activity.prompts.endDate);
            return type === "upcoming" ? endDate >= today : endDate < today;
          });
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
        height: "calc(100vh - 64px - 56px )",
        margin: "0 auto",
        position: "relative",
      }}
    >
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
