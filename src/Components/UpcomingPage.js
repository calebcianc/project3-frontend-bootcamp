import { useState, useContext, useEffect } from "react";
import MapItinerary from "./MapItinerary";
import { AccessTokenContext, CurrUserContext } from "../App";

export default function UpcomingPage({
  itineraryActivities,
  setItineraryActivities,
  selectedItinerary,
  setSelectedItinerary,
  isHighlighted,
  setHighlighted,
  handleOnCardClick,
  userId,
  setDataChanged,
  dataChanged,
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
        <em>
          You have no upcoming itineraries to view - Click the button below to
          generate one!
        </em>
      </div>
    );
  }

  return (
    <div>
      <MapItinerary
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
    </div>
  );
}
