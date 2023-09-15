import ItineraryCard from "./ItineraryCard";
import { useState, useEffect, useRef } from "react";
import "../App.css";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone"); // dependent on utc plugin
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Singapore");

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
  appliedFilters,
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
        {itineraryActivities
          .filter((itinerary) => {
            // Filter based on start and end dates if they exist
            if (appliedFilters.startDate && appliedFilters.endDate) {
              const itineraryStartDate = dayjs(itinerary.startDate);
              const itineraryEndDate = dayjs(itinerary.endDate);
              if (
                itineraryStartDate.isBefore(appliedFilters.startDate) ||
                itineraryEndDate.isAfter(appliedFilters.endDate)
              ) {
                return false;
              }
            }

            // Filter based on country if it exists
            if (
              appliedFilters.country &&
              itinerary.country !== appliedFilters.country.label
            ) {
              return false;
            }

            // Filter based on category if it exists
            if (
              appliedFilters.category &&
              itinerary.category !== appliedFilters.category
            ) {
              return false;
            }

            return true; // Include the itinerary if none of the above conditions were met
          })
          .map((itinerary, index) => (
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
