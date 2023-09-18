import { useEffect, useState, useContext } from "react";
import { Modal, ModalDialog, ModalClose } from "@mui/joy";
import {
  Box,
  TextField,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import axios from "axios";
import { BACKEND_URL } from "../constants.js";
import UserIcon from "./UserIcon.js";
import { convertToFormattedDate } from "../utils/utils";
import GroupIcon from "@mui/icons-material/Group";
import EventIcon from "@mui/icons-material/Event";
import PublicIcon from "@mui/icons-material/Public";
import LockIcon from "@mui/icons-material/Lock";
import Grid from "@mui/material/Grid";
import { CurrUserContext } from "../App.js";
import { countries } from "../Data/Countries";
import { useNavigate } from "react-router-dom";
import { FlightTakeoff as FlightTakeoffIcon } from "@mui/icons-material";

export default function ItineraryCard({
  itinerary,
  selectedItinerary,
  setSelectedItinerary,
  setItineraryPhoto,
  isHighlighted,
  handleOnCardClick,
  setDataChanged,
  dataChanged,
  setValue,
}) {
  const [users, setUsers] = useState([]);
  const currUser = useContext(CurrUserContext);
  const [currUserCreator, setCurrUserCreator] = useState(false);
  const navigate = useNavigate();
  const [editModalView, setEditModalView] = useState(false);
  const [name, setName] = useState(itinerary.name);
  const [isPublic, setIsPublic] = useState(itinerary.isPublic);
  const [maxPax, setMaxPax] = useState(itinerary.maxPax);
  const [genderPreference, setGenderPreference] = useState(
    itinerary.genderPreference
  );

  useEffect(() => {
    axios.get(`${BACKEND_URL}/user/${itinerary.id}`).then((response) => {
      setUsers(response.data); //JSON.stringify
      const foundUser = response.data.find(
        (user) => user.userId === currUser.id
      );
      if (foundUser) {
        setCurrUserCreator(foundUser.isCreator);
      }
    });
  }, []);

  const startDate = convertToFormattedDate(itinerary.prompts.startDate);
  const endDate = convertToFormattedDate(itinerary.prompts.endDate);

  const handleSelectItinerary = () => {
    setSelectedItinerary(itinerary.id);
  };
  const handleOpen = () => setEditModalView(true);
  const handleClose = () => setEditModalView(false);
  const handleEdit = async () => {
    try {
      const response = await axios.put(
        `${BACKEND_URL}/itinerary/${currUser.id}/${itinerary.id}`,
        {
          name: name,
          isPublic: isPublic,
          maxPax: maxPax,
          genderPreference: genderPreference,
        }
      );
      handleClose();
      setDataChanged(!dataChanged);
      navigate(`/upcoming`);
    } catch (error) {
      console.error("An error occurred while updating the itinerary:", error);
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`${BACKEND_URL}/itinerary/${currUser.id}/${id}`)
      .then((response) => {
        console.log(response.data);
        setDataChanged(!dataChanged);
        navigate(`/upcoming`);
      });
  };

  const handleLeave = (id) => {
    axios
      .delete(`${BACKEND_URL}/itinerary/${currUser.id}/${id}`)
      .then((response) => {
        console.log(response.data);
        setDataChanged(!dataChanged);
        navigate(`/upcoming`);
      });
  };

  const countryName = itinerary.prompts.country;

  // render country flag next to country name
  const countryCode = () => {
    const country = countries.find((country) => country.label === countryName);
    return country ? country.code : null;
  };

  const isFormValid = () => {
    if (!itinerary.name.trim()) {
      alert("Name cannot be empty");
      return false;
    }
    return true;
  };
  const handlePublicChange = (event) => {
    const value = event.target.value;
    setIsPublic(value === "true");
  };

  return (
    <>
      <Card
        className={`${
          itinerary.id === isHighlighted ? "highlighted-card" : ""
        }`}
        sx={{
          width: "calc(100% - 8mm)",
          m: "0 4mm 4mm 4mm",
          borderRadius: "4px",
          border: itinerary.id === isHighlighted ? "2px solid black" : "",
          ":hover": {
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          },
          cursor: "pointer",
        }}
        onClick={() => handleOnCardClick(itinerary)}
      >
        <Box position="relative">
          <CardMedia
            component="img"
            sx={{
              height: 140,
              objectFit: "cover",
            }}
            image={itinerary.photoUrl ? itinerary.photoUrl : null}
            title={`Click to view ${itinerary.name}`}
          />
          <Box
            position="absolute"
            top={0}
            left={0}
            zIndex={1}
            color="white"
            bgcolor="rgba(0, 0, 0, 0.6)"
            p={1}
          >
            <Typography variant="h6">{itinerary.name}</Typography>
          </Box>
        </Box>
        <CardContent style={{ paddingBottom: "0px" }}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Grid container alignItems="center" justifyContent="flex-start">
                {/* <RoomIcon color="action" style={{ marginRight: "5px" }} />
                 */}
                <img
                  loading="lazy"
                  width="24"
                  src={`https://flagcdn.com/w20/${countryCode().toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w40/${countryCode().toLowerCase()}.png 2x`}
                  alt=""
                  style={{ marginRight: "5px" }}
                />
                <Typography variant="body2">
                  {itinerary.prompts.country}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container alignItems="center" justifyContent="center">
                <EventIcon color="action" style={{ marginRight: "5px" }} />
                <Typography variant="body2">
                  {startDate} to {endDate}
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={3}>
              <Grid container alignItems="center" justifyContent="flex-end">
                {itinerary.isPublic ? (
                  <PublicIcon color="action" style={{ marginRight: "5px" }} />
                ) : (
                  <LockIcon color="action" style={{ marginRight: "5px" }} />
                )}
                <Typography variant="body2">
                  {itinerary.isPublic ? "Public" : "Private"}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                alignItems="center"
                style={{ marginBottom: "10px" }}
              >
                <GroupIcon color="action" style={{ marginRight: "5px" }} />
                <Typography variant="body2" style={{ marginRight: "5px" }}>
                  {users.length === itinerary.maxPax ? "(Full)" : null}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  {users.map((user, index) => (
                    <Box key={index}>
                      <UserIcon user={user.user} isCreator={user.isCreator} />
                    </Box>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          {isHighlighted === itinerary.id ? (
            currUserCreator ? (
              <>
                <Button
                  size="small"
                  variant="contained"
                  onClick={handleSelectItinerary}
                >
                  View
                </Button>
                <Button size="small" onClick={() => handleOpen()}>
                  Edit
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(itinerary.id)}
                >
                  Delete
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="small"
                  variant="contained"
                  onClick={handleSelectItinerary}
                >
                  View
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={() => handleLeave(itinerary.id)}
                >
                  Leave
                </Button>
              </>
            )
          ) : null}
        </CardActions>
      </Card>
      <Modal
        open={editModalView}
        onClose={(event, reason) => handleClose(event, reason)}
      >
        <ModalDialog size="lg" variant="outlined">
          <ModalClose />
          <Box component="form">
            <Typography
              component="h2"
              id="modal-title"
              level="h4"
              textColor="inherit"
              fontWeight="lg"
              mb={2}
            >
              Edit your itinerary!
            </Typography>

            <FormControl style={{ display: "flex" }}>
              <FormLabel style={{ marginBottom: "5px" }}>
                Describe your itinerary:
              </FormLabel>
              <TextField
                id="itinerary-name"
                label="Itinerary name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </FormControl>
            <br />

            <br />
            <FormControl style={{ marginBottom: "10px" }}>
              <FormLabel id="is-public">
                Make your itinerary private or public?
              </FormLabel>
              <RadioGroup
                name="is-public"
                value={isPublic}
                onChange={handlePublicChange}
                row
              >
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="Private"
                />
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Public"
                />
              </RadioGroup>
            </FormControl>
            <br />

            {isPublic === false ? null : (
              <>
                <FormControl
                  style={{
                    marginBottom: "15px",
                  }}
                >
                  <FormLabel
                    style={{
                      marginBottom: "5px",
                    }}
                  >
                    How many people do you want in your group?
                  </FormLabel>
                  <TextField
                    style={{
                      width: "20%",
                    }}
                    id="max-pax"
                    type="number"
                    InputProps={{
                      inputProps: { min: 1 },
                      style: { height: "60%" },
                    }}
                    placeholder="Type a number..."
                    value={maxPax}
                    onChange={(event) => setMaxPax(event.target.value)}
                  />
                </FormControl>
                <br />
                <FormControl>
                  <FormLabel id="gender-preference">
                    Gender Preference
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="gender-preference"
                    name="controlled-radio-buttons-group"
                    value={genderPreference}
                    onChange={(event) =>
                      setGenderPreference(event.target.value)
                    }
                    row
                  >
                    <FormControlLabel
                      value="any"
                      control={<Radio />}
                      label="Any"
                    />
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                  </RadioGroup>
                </FormControl>
                <br />
                <br />
              </>
            )}

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                endIcon={<FlightTakeoffIcon />}
                disabled={!isFormValid()}
                onClick={() => handleEdit(itinerary.id)}
              >
                Edit itinerary
              </Button>
            </div>
          </Box>
        </ModalDialog>
      </Modal>
    </>
  );
}
