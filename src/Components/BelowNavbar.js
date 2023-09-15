import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { BACKEND_URL } from "../constants.js";
import "../App.css";
import ItineraryOptionsButton from "./ItineraryOptionsButton";
import ExplorePage from "./ExplorePage.js";
import UpcomingPage from "./UpcomingPage.js";
import PastPage from "./PastPage.js";
import { CurrUserContext } from "../App.js";

export default function BelowNavbar({
  type,
  selectedItinerary,
  setSelectedItinerary,
  value,
  setValue,
}) {
  const [itineraryActivities, setItineraryActivities] = useState([]);
  const [isHighlighted, setHighlighted] = useState(null);
  const currUser = useContext(CurrUserContext);
  const userId = currUser.id;
  const [dataChanged, setDataChanged] = useState(false);

  const handleOnCardClick = (card) => {
    if (card === null) {
      setHighlighted(null);
    }
    if (isHighlighted === card.id) {
      setHighlighted(null);
    } else {
      setHighlighted(card.id);
    }
  };

  useEffect(() => {
    console.log("belownavbar userid", userId);
    let apiEndpoint;
    const today = new Date();

    switch (type) {
      case "explore":
        apiEndpoint = userId
          ? `${BACKEND_URL}/itinerary/explore/${userId}`
          : `${BACKEND_URL}/itinerary/explore`;

        axios.get(apiEndpoint).then((response) => {
          console.log("response.data", response.data);
          console.log("today", today);
          const filteredData = response.data.filter((activity) => {
            const endDate = new Date(activity.prompts.endDate);
            return endDate >= today;
          });
          setItineraryActivities(filteredData);
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
          const filteredData = response.data.filter((activity) => {
            const endDate = new Date(activity.prompts.endDate);
            return type === "upcoming" ? endDate >= today : endDate < today;
          });
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
  }, [type, userId, dataChanged, value]);

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
          value={value}
          setValue={setValue}
          type={type}
        />
      ) : type === "upcoming" ? (
        <UpcomingPage
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
        />
      ) : (
        <PastPage
          selectedItinerary={selectedItinerary}
          setSelectedItinerary={setSelectedItinerary}
          itineraryActivities={itineraryActivities}
          isHighlighted={isHighlighted}
          setHighlighted={setHighlighted}
          handleOnCardClick={handleOnCardClick}
          userId={userId}
          value={value}
          setValue={setValue}
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
