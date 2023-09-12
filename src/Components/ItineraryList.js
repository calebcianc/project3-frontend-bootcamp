import ItineraryCard from "./ItineraryCard";
import { useEffect, useState, useRef } from "react";
import "../App.css";
import { Box } from "@mui/material";

export default function ItineraryList({
  itineraryActivities,
  selectedItinerary,
  setSelectedItinerary,
  setItineraryPhoto,
  isHighlighted,
  setHighlighted,
  handleOnCardClick,
  setDataChanged,
  dataChanged,
}) {
  const highlightedItineraryCardRef = useRef(null); // Create reference for highlighted card
  // useEffect to cause highlighted card to scroll into view
  useEffect(() => {
    if (highlightedItineraryCardRef.current) {
      highlightedItineraryCardRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  });

  return (
    <Box>
      {itineraryActivities.map((itinerary, index) => (
        <div
          key={itinerary.id}
          ref={
            itinerary.id === isHighlighted ? highlightedItineraryCardRef : null
          }
        >
          <ItineraryCard
            key={itinerary.id}
            itinerary={itinerary}
            setItineraryPhoto={setItineraryPhoto}
            selectedItinerary={selectedItinerary}
            setSelectedItinerary={setSelectedItinerary}
            isHighlighted={isHighlighted}
            handleOnCardClick={handleOnCardClick}
            setDataChanged={setDataChanged}
            dataChanged={dataChanged}
          />
        </div>
      ))}
    </Box>
  );
}
