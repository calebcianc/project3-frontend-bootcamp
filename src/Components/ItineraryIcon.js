import { useState, useContext } from "react";
import { Box, Typography, Tooltip, Modal, Button } from "@mui/material";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import { BACKEND_URL } from "../constants.js";
import UserIcon from "./UserIcon.js";
import { convertToDDMMYYYY } from "../utils/utils";
import { CurrUserContext } from "../App.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ItineraryIcon({
  itineraryId,
  itinerary,
  setSelectedItinerary,
}) {
  const startDate = convertToDDMMYYYY(itinerary.prompts.startDate);
  const endDate = convertToDDMMYYYY(itinerary.prompts.endDate);
  const [open, setOpen] = useState(false);
  const currUser = useContext(CurrUserContext);
  const userId = currUser.id;
  const navigate = useNavigate();

  const handleSelectItinerary = () => {
    setSelectedItinerary(itineraryId);
    handleClose();
  };

  const handleOpen = (event) => {
    if (event) event.stopPropagation();
    setOpen(true);
  };

  const handleClose = (event) => {
    if (event) event.stopPropagation();
    setOpen(false);
  };

  const handleJoinItinerary = () => {
    if (
      (currUser.gender === itinerary.genderPreference) |
      (itinerary.genderPreference === "Any")
    ) {
      axios
        .post(`${BACKEND_URL}/itinerary/${userId}/${itineraryId}`)
        .then((res) => {
          console.log(res.data);
          navigate(`/upcoming`);
        });
    } else {
      alert(
        "Unable to join itinerary due to gender preference indicated! Please select another itinerary to join."
      );
      console.log(
        "Unable to join itinerary due to gender preference indicated!"
      );
    }
    handleClose();
  };

  return (
    <div onClick={handleOpen} style={{ cursor: "pointer" }}>
      <Tooltip
        title={`${itinerary.name} | Max Pax: ${itinerary.maxPax} | Gender Preference: ${itinerary.genderPreference}`}
        arrow
      >
        <Box
          sx={{
            width: 150,
            height: 150,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: `url(${itinerary.photoUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
        >
          <Typography
            sx={{
              position: "absolute",
              bottom: 0,
              color: "black",
              textAlign: "center",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              width: "100%",
              padding: "0.5em",
              boxSizing: "border-box",
            }}
          >
            {itinerary.prompts.country}
          </Typography>
        </Box>
      </Tooltip>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalDialog size="lg" variant="outlined">
          <ModalClose onClick={handleClose} />
          <Typography variant="h5" component="h2">
            {itinerary.name}
          </Typography>
          <Typography>
            {" "}
            {itinerary.prompts.country} | {itinerary.prompts.category}
            <br />
            {startDate} - {endDate}
            <br />
            {itinerary.users.length}/{itinerary.maxPax} participants (
            {itinerary.genderPreference})
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {itinerary.users.map((user, index) => (
              <Box sx={{ marginRight: 1, marginBottom: 1 }} key={index}>
                <UserIcon
                  user={user}
                  isCreator={user.user_itineraries.isCreator}
                />
              </Box>
            ))}
            <div>
              <Button onClick={handleSelectItinerary}>view itinerary</Button>
              <Button onClick={handleJoinItinerary}>join itinerary</Button>
              <Button onClick={handleClose}>Close</Button>
            </div>
          </Box>
        </ModalDialog>
      </Modal>
    </div>
  );
}
