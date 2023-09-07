// button to add, delete itinerary
import * as React from "react";
import { useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import GenerateItineraryModal from "./GenerateItineraryModal";

export default function ItineraryOptionsButton({
  option,
  itineraryActivities,
  setItineraryActivities,
  setSelectedItinerary,
}) {
  const [modalView, setModalView] = useState(false);
  const handleOpen = () => setModalView(true);
  const handleClose = () => setModalView(false);

  return (
    <div>
      {/* depending on the prop, to render a button to add an itinerary or delete an itinerary */}
      {option === "add" ? (
        <div
          style={{
            textAlign: "right",
            justifyContent: "space-around",
            padding: "0 ",
            position: "relative",
            bottom: "80px",
          }}
        >
          {" "}
          <Fab
            color="primary"
            size="medium"
            aria-label="add"
            style={{ marginRight: "25px" }}
          >
            <AddIcon onClick={handleOpen} />
          </Fab>
        </div>
      ) : option === "delete" ? (
        <div>Render delete itinerary button</div>
      ) : null}

      <GenerateItineraryModal
        modalView={modalView}
        handleClose={handleClose}
        itineraryActivities={itineraryActivities}
        setItineraryActivities={setItineraryActivities}
        setSelectedItinerary={setSelectedItinerary}
      />
    </div>
  );
}
