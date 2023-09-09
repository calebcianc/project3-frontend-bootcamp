import { useEffect, useState } from "react";
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
import { convertToDDMMYYYY } from "../utils/utils";
import GroupIcon from "@mui/icons-material/Group";
import RoomIcon from "@mui/icons-material/Room";
import EventIcon from "@mui/icons-material/Event";
import PublicIcon from "@mui/icons-material/Public";
import LockIcon from "@mui/icons-material/Lock";
import Grid from "@mui/material/Grid";

export default function ItineraryCard({
  itinerary,
  selectedItinerary,
  setSelectedItinerary,
  setItineraryPhoto,
  isHighlighted,
  handleOnCardClick,
}) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/user/${itinerary.id}`).then((response) => {
      setUsers(response.data); //JSON.stringify
    });
  }, []);

  const convertToFormattedDate = (dateString) => {
    const date = new Date(dateString.split("/").reverse().join("-"));
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  const startDate = convertToFormattedDate(itinerary.prompts.startDate);
  const endDate = convertToFormattedDate(itinerary.prompts.endDate);

  const handleSelectItinerary = () => {
    setSelectedItinerary(itinerary.id);
    // setItineraryPhoto({ photo: itinerary.photoUrl, name: itinerary.name });
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
      }}
    >
      <Box position="relative">
        <CardMedia
          component="img"
          sx={{
            height: 140,
            objectFit: "cover",
            cursor: "pointer",
          }}
          image={itinerary.photoUrl ? itinerary.photoUrl : null}
          title={`Click to view ${itinerary.name}`}
          onClick={handleSelectItinerary}
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
      <CardContent
        onClick={() => handleOnCardClick(itinerary)}
        style={{ paddingBottom: "0px" }}
      >
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Grid container alignItems="center" justifyContent="flex-start">
              <RoomIcon color="action" style={{ marginRight: "5px" }} />
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
        <Button size="small">Edit</Button>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  );
}
