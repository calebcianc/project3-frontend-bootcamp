import { useState } from "react";
import ActivityList from "./ActivityList";
import ItineraryList from "./ItineraryList";
import RightContainerFilterButton from "./RightContainerFilterButton";

export default function RightContainer({
  selectedItinerary,
  setSelectedItinerary,
  itineraryActivities,
  setItineraryActivities,
  itineraryPhoto,
  setItineraryPhoto,
  isHighlighted,
  setHighlighted,
  handleOnCardClick,
  userId,
  setDataChanged,
  dataChanged,
  setValue,
}) {
  const [filters, setFilters] = useState({
    country: "",
    startDate: "",
    endDate: "",
    people: "",
  });

  return (
    <div style={{ maxWidth: "100%" }}>
      {selectedItinerary ? (
        <ActivityList
          selectedItinerary={selectedItinerary}
          setSelectedItinerary={setSelectedItinerary}
          itineraryActivities={itineraryActivities}
          setItineraryActivities={setItineraryActivities}
          itineraryPhoto={itineraryPhoto}
          isHighlighted={isHighlighted}
          setHighlighted={setHighlighted}
          handleOnCardClick={handleOnCardClick}
          userId={userId}
        />
      ) : (
        <div
          style={{
            maxHeight: "calc(100vh - 64px - 56px )",
            overflow: "auto",
          }}
        >
          <RightContainerFilterButton
            filters={filters}
            setFilters={setFilters}
          />
          <ItineraryList
            selectedItinerary={selectedItinerary}
            setSelectedItinerary={setSelectedItinerary}
            itineraryActivities={itineraryActivities}
            setItineraryActivities={setItineraryActivities}
            setItineraryPhoto={setItineraryPhoto}
            isHighlighted={isHighlighted}
            setHighlighted={setHighlighted}
            handleOnCardClick={handleOnCardClick}
            userId={userId}
            setDataChanged={setDataChanged}
            dataChanged={dataChanged}
            setValue={setValue}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
      )}
    </div>
  );
}
