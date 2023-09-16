import { useState, useContext, useEffect } from "react";
import ItineraryIcon from "./ItineraryIcon";
import MapItinerary from "./MapItinerary";
import axios from "axios";
import { BACKEND_URL } from "../constants.js";
import { AccessTokenContext, CurrUserContext } from "../App";

export default function PastPage({
  itineraryActivities,
  selectedItinerary,
  setSelectedItinerary,
  isHighlighted,
  setHighlighted,
  handleOnCardClick,
  value,
  setValue,
}) {
  const accessToken = useContext(AccessTokenContext);
  const currUser = useContext(CurrUserContext);
  if (
    (itineraryActivities && itineraryActivities.length === 0) ||
    !accessToken
  ) {
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <em>There are no past itineraries available for you to view</em>
      </div>
    );
  }
  return (
    <div>
      {selectedItinerary ? (
        <MapItinerary
          selectedItinerary={selectedItinerary}
          setSelectedItinerary={setSelectedItinerary}
          itineraryActivities={itineraryActivities}
          isHighlighted={isHighlighted}
          setHighlighted={setHighlighted}
          handleOnCardClick={handleOnCardClick}
        />
      ) : (
        <div className="icon-container">
          {itineraryActivities.map((itinerary, index) => (
            <ItineraryIcon
              key={itinerary.id}
              itineraryId={itinerary.id}
              itinerary={itinerary}
              setSelectedItinerary={setSelectedItinerary}
              value={value}
              setValue={setValue}
            />
          ))}
        </div>
      )}
    </div>
  );
}
