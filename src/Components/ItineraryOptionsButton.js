// button to add, delete itinerary
import * as React from "react";
import { useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function ItineraryOptionsButton({ option }) {
  const [modalView, setModalView] = useState(false);
  const handleOpen = () => setModalView(true);
  const handleClose = () => setModalView(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      {/* depending on the prop, to render a button to add an itinerary or delete an itinerary */}
      {option === "add" ? (
        <div style={{ textAlign: "right", margin: " 0 20px 20px 0" }}>
          {" "}
          <Fab color="primary" size="medium" aria-label="add">
            <AddIcon onClick={handleOpen} />
          </Fab>
        </div>
      ) : option === "delete" ? (
        <div>Render delete itinerary button</div>
      ) : null}

      <Modal
        open={modalView}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form">
          <div>
            <TextField
              required
              id="outlined-required"
              label="Required"
              defaultValue="Hello World"
            />
          </div>{" "}
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        </Box>
      </Modal>
    </div>
  );
}
