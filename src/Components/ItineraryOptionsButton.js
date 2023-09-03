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
  setItineraryActivities,
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
            width: "95%",
            textAlign: "right",
            justifyContent: "space-around",
            padding: "0 20px 20px 0",
            position: "absolute",
            top: "90svh",
            transform: "translateY(-100%)",
          }}
        >
          {" "}
          <Fab color="primary" size="medium" aria-label="add">
            <AddIcon onClick={handleOpen} />
          </Fab>
        </div>
      ) : option === "delete" ? (
        <div>Render delete itinerary button</div>
      ) : null}

      <GenerateItineraryModal
        modalView={modalView}
        handleClose={handleClose}
        setItineraryActivities={setItineraryActivities}
      />
    </div>
  );
}
