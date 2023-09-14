import { useEffect, useState, useContext } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";
import { BACKEND_URL } from "../constants.js";
import UserIcon from "./UserIcon.js";
import { convertToFormattedDate } from "../utils/utils";
import GroupIcon from "@mui/icons-material/Group";
import RoomIcon from "@mui/icons-material/Room";
import EventIcon from "@mui/icons-material/Event";
import PublicIcon from "@mui/icons-material/Public";
import LockIcon from "@mui/icons-material/Lock";
import Grid from "@mui/material/Grid";
import { CurrUserContext } from "../App.js";
import { countries } from "../Data/Countries";
import { useNavigate } from "react-router-dom";

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

  // get all users for this itinerary and set it as user
  // check if curr user is creator and set it as currUserCreator
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

  const handleEdit = (id) => {
    console.log(`Editing itinerary with id ${id}`);
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

  return (
    <Card
      className={`${itinerary.id === isHighlighted ? "highlighted-card" : ""}`}
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
          // onClick={handleSelectItinerary}
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
            <Grid container alignItems="center">
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
              <Button size="small" onClick={handleSelectItinerary}>
                View
              </Button>
              <Button size="small" onClick={() => handleEdit(itinerary.id)}>
                Edit
              </Button>
              <Button size="small" onClick={() => handleDelete(itinerary.id)}>
                Delete
              </Button>
            </>
          ) : (
            <>
              <Button size="small" onClick={handleSelectItinerary}>
                View
              </Button>
              <Button size="small" onClick={() => handleLeave(itinerary.id)}>
                Leave Itinerary
              </Button>
            </>
          )
        ) : null}
      </CardActions>
    </Card>
  );
}
