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

export default function ItineraryCard({ itinerary }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/user/${itinerary.id}`).then((response) => {
      setUsers(response.data); //JSON.stringify
      console.log("users", response.data);
    });
  }, []);

  return (
    <Card sx={{ width: "100%", m: "2mm", borderRadius: "4px" }}>
      <Box position="relative">
        <CardMedia
          component="img"
          sx={{
            height: 140,
            objectFit: "cover",
          }}
          image={
            itinerary.activities[0].photoUrl
              ? itinerary.activities[0].photoUrl
              : null
          }
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
          Country <br />
          Start date - End date <br />
          Category
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
