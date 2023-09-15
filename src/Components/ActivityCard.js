import Grid from "@mui/material/Grid";
import { Card, CardContent, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DescriptionIcon from "@mui/icons-material/Description";
import ActivityModal from "./ActivityModal";
import { useState } from "react";

export default function ActivityCard({
  key,
  activity,
  isHighlighted,
  userId,
  itineraryActivities,
  setItineraryActivities,
}) {
  // console.log("activity: ", JSON.stringify(activity));

  const timeOfDay = activity["timeOfDay"];
  const capitalizedTimeOfDay =
    timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1).toLowerCase();

  const today = new Date();
  const isPastDate = activity["date"] < today;

  const [modalShow, setModalShow] = useState(false);

  const handleEditIconClick = () => {
    setModalShow(true);
    // return alert("test");
  };

  return (
    <div>
      <Card
        sx={{
          position: "relative",
          borderRadius: "10px",
          cursor: "pointer",
          border: isHighlighted === activity.id ? "2px solid black" : "",
          ":hover": {
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          },
        }}
      >
        <CardContent style={{ padding: "15px" }}>
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
              <Typography
                variant="body2"
                color={isPastDate ? "text.secondary" : "text.primary"}
              >
                {capitalizedTimeOfDay}
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
              <LocationOnIcon color="action" />
            </Grid>
            <Grid item>
              <Typography variant="body2">{activity["location"]}</Typography>
            </Grid>
          </Grid>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <AccessTimeIcon color="action" style={{ marginRight: "15px" }} />
            <Typography variant="body2">
              {activity["suggestedDuration"]}
            </Typography>
          </div>
          <Grid container spacing={2}>
            <Grid item>
              <DescriptionIcon color="action" />
            </Grid>
            <Grid item xs>
              <Typography
                variant="body2"
                // style={{ margin: 0, padding: 0 }}
                sx={{ textAlign: "left", display: "inline-block" }}
              >
                {activity["description"]}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        {isHighlighted === activity.id ? (
          <EditIcon
            onClick={(e) => {
              e.stopPropagation();
              handleEditIconClick();
            }}
            sx={{
              position: "absolute",
              top: "15px",
              right: "15px",
              cursor: "pointer",
              "&:hover": {
                color: "#4285F4",
              },
            }}
          />
        ) : null}
      </Card>

      <ActivityModal
        modalShow={modalShow}
        setModalShow={setModalShow}
        type={"edit"}
        activity={activity}
        userId={userId}
        itineraryActivities={itineraryActivities}
        setItineraryActivities={setItineraryActivities}
      />
    </div>
  );
}
