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

export default function ActivityCard({ key, activity }) {
  console.log("activity: ", JSON.stringify(activity));

  const date = new Date(activity["date"]);
  // Extract the various parts of the date
  const day = date.getUTCDate();
  const month = date.getUTCMonth(); // Month is 0-indexed
  const year = date.getUTCFullYear().toString().substr(-2); // Get the last two digits of the year

  // Month array to convert month number to month abbreviation
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Construct the formatted string
  const formattedDate = `${day} ${monthNames[month]} ${year}`;

  const timeOfDay = activity["timeOfDay"];
  const capitalizedTimeOfDay =
    timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1).toLowerCase();

  const today = new Date();
  const isPastDate = activity["date"] < today;

  return (
    <Card
      sx={{
        width: "calc(100% - 8mm)",
        m: "4mm",
        borderRadius: "4px",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        cursor: "pointer",
      }}
    >
      <CardContent>
        <Typography
          variant="body2"
          color={isPastDate ? "text.secondary" : "text.primary"}
        >
          {formattedDate} ({capitalizedTimeOfDay})
          <br />
          {activity["name"]} @ {activity["location"]} [
          {activity["suggestedDuration"]}]
          <br />
          <em>{activity["description"]}</em>
        </Typography>
      </CardContent>
    </Card>
  );
}
