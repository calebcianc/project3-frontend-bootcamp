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

export default function ItineraryCard({ itinerary }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/user/${itinerary.id}`).then((response) => {
      setUsers(response.data); //JSON.stringify
    });
  }, []);

  const startDate = convertToDDMMYYYY(itinerary.prompts.startDate);
  const endDate = convertToDDMMYYYY(itinerary.prompts.endDate);

  console.log("itinerary", itinerary);
  console.log("users number", users.length);

  return (
    <Card sx={{ width: "calc(100% - 8mm)", m: "4mm", borderRadius: "4px" }}>
      <Box position="relative">
        <CardMedia
          component="img"
          sx={{
            height: 140,
            objectFit: "cover",
          }}
          image={itinerary.photoUrl ? itinerary.photoUrl : null}
          title={itinerary.name}
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
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {itinerary.prompts.country} | {itinerary.prompts.category}
          <br />
          {startDate} - {endDate}
          <br />
          {itinerary.isPublic ? "Public" : "Private"} - {users.length}/
          {itinerary.maxPax} participants{" "}
          {users.length === itinerary.maxPax ? "(Full)" : null}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {users.map((user, index) => (
              <Box sx={{ marginRight: 1, marginBottom: 1 }} key={index}>
                <UserIcon user={user} />
              </Box>
            ))}
          </Box>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Edit</Button>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  );
}
