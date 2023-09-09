import React, { useState } from "react";
import { Box, Typography, Tooltip, Modal, Button } from "@mui/material";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import { BACKEND_URL } from "../constants.js";
import UserIcon from "./UserIcon.js";
import { convertToDDMMYYYY } from "../utils/utils";

export default function ItineraryIcon({
  itineraryId,
  itinerary,
  setSelectedItinerary,
}) {
  console.log("itinerary", itinerary);

  const startDate = convertToDDMMYYYY(itinerary.prompts.startDate);
  const endDate = convertToDDMMYYYY(itinerary.prompts.endDate);
  console.log("startDate", startDate);

  const [open, setOpen] = useState(false);
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
    // to retrieve curr user gender to check if user is able to join
    console.log("join itinerary");
    // console.log("userId", userId);
    console.log("itinerary.genderPreference", itinerary.genderPreference);
    handleClose();
  };

  const body = (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
      }}
    >
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
            <UserIcon user={user} isCreator={user.user_itineraries.isCreator} />
          </Box>
        ))}
      </Box>

      <Button onClick={handleSelectItinerary}>view itinerary</Button>
      <Button onClick={handleJoinItinerary}>join itinerary</Button>
      <Button onClick={handleClose}>Close</Button>
    </Box>
  );

  return (
    <div onClick={handleOpen}>
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
          {body}
        </ModalDialog>
      </Modal>
    </div>
  );
}
