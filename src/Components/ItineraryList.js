import ItineraryCard from "./ItineraryCard";
import { useState, useEffect, useRef } from "react";
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
  setValue,
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

  // built-in delay so the itinerary cards from other pages (explore and past) do not flicker at all
  // const [shouldRender, setShouldRender] = useState(false);
  const [style, setStyle] = useState({ opacity: 0 });
  useEffect(() => {
    const timer = setTimeout(() => {
      // setShouldRender(true);
      setStyle({ opacity: 1 });
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ ...style, transition: "opacity 500ms ease-in-out" }}>
      {/* {shouldRender && ( */}
      <Box>
        {itineraryActivities.map((itinerary, index) => (
          <div
            key={itinerary.id}
            ref={
              itinerary.id === isHighlighted
                ? highlightedItineraryCardRef
                : null
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
              setValue={setValue}
            />
          </div>
        ))}
      </Box>
      {/* )} */}
    </div>
  );
}
