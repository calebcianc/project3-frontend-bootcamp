import { useState, useContext, useEffect } from "react";
import { Box, Typography, Tooltip, Modal, Button } from "@mui/material";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import { BACKEND_URL } from "../constants.js";
import UserIcon from "./UserIcon.js";
import { convertToFormattedDate } from "../utils/utils";
import { CurrUserContext } from "../App.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import GroupIcon from "@mui/icons-material/Group";
import Grid from "@mui/material/Grid";
import { countries } from "../Data/Countries";

export default function ItineraryIcon({
  itineraryId,
  itinerary,
  setSelectedItinerary,
  value,
  setValue,
}) {
  const [open, setOpen] = useState(false);
  const currUser = useContext(CurrUserContext);
  const userId = currUser.id;
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const startDate = convertToFormattedDate(itinerary.prompts.startDate);
  const endDate = convertToFormattedDate(itinerary.prompts.endDate);

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
        });
    } else {
      alert(
        "Unable to join itinerary due to gender preference indicated! Please select another itinerary to join."
      );
      console.log(
        "Unable to join itinerary due to gender preference indicated!"
      );
    }
    setValue("upcoming");
    navigate(`/upcoming`);
    handleClose();
  };

  const countryName = itinerary.prompts.country;

  // render country flag next to country name
  const countryCode = () => {
    const country = countries.find((country) => country.label === countryName);
    return country ? country.code : null;
  };

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/user/${itineraryId}`)
      .then((response) => {
        const usersArray = response.data.map((item) => item.user);
        setUsers(usersArray);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      });
  }, [itineraryId]);

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
        <ModalDialog
          size="lg"
          variant="outlined"
          style={{ width: "80%", maxWidth: "500px" }}
        >
          <ModalClose onClick={handleClose} />
          <Grid
            container
            spacing={2}
            alignItems="center"
            style={{ marginBottom: "15px" }}
          >
            <Grid item>
              <Typography variant="h5" component="h2">
                {itinerary.name}
              </Typography>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={2}
            alignItems="center"
            style={{ marginBottom: "5px" }}
          >
            <Grid item>
              <img
                loading="lazy"
                width="24"
                src={`https://flagcdn.com/w20/${countryCode().toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/w40/${countryCode().toLowerCase()}.png 2x`}
                alt=""
              />
            </Grid>
            <Grid item>
              <Typography>
                {itinerary.prompts.country} | {itinerary.prompts.category}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            alignItems="center"
            style={{ marginBottom: "5px" }}
          >
            <Grid item>
              <CalendarTodayIcon color="action" />
            </Grid>
            <Grid item>
              <Typography>
                {startDate} to {endDate}
              </Typography>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={2}
            alignItems="center"
            style={{ marginBottom: "5px" }}
          >
            <Grid item>
              <GroupIcon color="action" />
            </Grid>
            <Grid item>
              <Typography>
                {itinerary.users.length}/{itinerary.maxPax} participants (
                {itinerary.genderPreference})
              </Typography>
            </Grid>
          </Grid>
          <div>
            {value === "explore" ? (
              <Grid
                container
                spacing={2}
                alignItems="center"
                style={{ marginLeft: "24px", marginBottom: "15px" }}
              >
                {itinerary.users.map((user, index) => (
                  <Grid item key={index}>
                    <UserIcon
                      user={user}
                      isCreator={user.user_itineraries.isCreator}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Grid
                container
                spacing={2}
                alignItems="center"
                style={{ marginLeft: "24px", marginBottom: "15px" }}
              >
                {users.map((user, index) => (
                  <Grid item key={index}>
                    <UserIcon user={user} isCreator={user.isCreator} />
                  </Grid>
                ))}
              </Grid>
            )}
          </div>

          <Grid
            container
            spacing={2}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Grid item>
              <Grid container spacing={2}>
                <Grid item>
                  <Button onClick={handleSelectItinerary} variant="contained">
                    View
                  </Button>
                </Grid>
                {value !== "past" && (
                  <Grid item>
                    <Button onClick={handleJoinItinerary} variant="contained">
                      Join
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid item>
              <Button onClick={handleClose}>Close</Button>
            </Grid>
          </Grid>
        </ModalDialog>
      </Modal>
    </div>
  );
}
