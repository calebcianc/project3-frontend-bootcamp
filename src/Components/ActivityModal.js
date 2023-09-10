import { useState, useEffect } from "react";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Box from "@mui/material/Box";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import "./LoadingSpinner.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Geocode from "react-geocode";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import { BACKEND_URL } from "../constants.js";

var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone"); // dependent on utc plugin
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Singapore");

export default function ActivityModal({
  modalShow,
  setModalShow,
  type,
  activity,
  userId,
  itineraryActivities,
  setItineraryActivities,
}) {
  // Details of an activity that a user might want to change: date name description timeOfDay suggestedDuration location
  const [date, setDate] = useState(dayjs(activity.date));
  const [dateChanged, setDateChanged] = useState(false);
  const [name, setName] = useState(activity.name);
  const [description, setDescription] = useState(activity.description);
  const capitalizedTimeOfDay =
    activity.timeOfDay.charAt(0).toUpperCase() +
    activity.timeOfDay.slice(1).toLowerCase();
  const [timeOfDay, setTimeOfDay] = useState(capitalizedTimeOfDay);
  const [suggestedDuration, setSuggestedDuration] = useState(
    activity.suggestedDuration
  );
  const [location, setLocation] = useState(activity.location);
  const [latitude, setLat] = useState(activity.latitude);
  const [longitude, setLng] = useState(activity.longitude);
  const [showButton, setShowButton] = useState(false);

  console.log("activityDate: ", activity.date);
  const disableDatesBeforeToday = (date) => {
    // Get yesterday's date
    const yesterday = dayjs().subtract(1, "day");
    // Disable dates up to and including yesterday
    return date <= yesterday;
  };

  // code to check if the new location input by user is valid i.e., has coordinates
  const [iconColor, setIconColor] = useState("green");
  const handleLocationChange = (e) => {
    setIconColor("red");
    setShowButton(true);
    setLocation(e.target.value);
  };
  const getLatLng = () => {
    // Your Geocode function to get latitude and longitude
    // For the purpose of this example, let's assume it returns a Promise
    Geocode.fromAddress(location, process.env.REACT_APP_GOOGLE_API_KEY).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setLat(lat);
        setLng(lng);
        setIconColor("green");
      },
      (error) => {
        console.error(error);
        setLat(null);
        setLng(null);
      }
    );
  };

  // checks if any field has been changed. if so, the edit button becomes enabled / clickable
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  useEffect(() => {
    const hasChanged =
      dateChanged ||
      name !== activity.name ||
      description !== activity.description ||
      timeOfDay.toLowerCase() !== activity.timeOfDay.toLowerCase() ||
      suggestedDuration !== activity.suggestedDuration ||
      location !== activity.location;

    setIsButtonDisabled(!hasChanged);
  }, [
    date,
    name,
    description,
    timeOfDay,
    suggestedDuration,
    location,
    iconColor,
    activity,
  ]);

  // resets the value of the fields to original if user closes the modal
  const handleOnClose = () => {
    setDate(dayjs(activity.date));
    setName(activity.name);
    setDescription(activity.description);
    const capitalizedTimeOfDay =
      activity.timeOfDay.charAt(0).toUpperCase() +
      activity.timeOfDay.slice(1).toLowerCase();
    setTimeOfDay(capitalizedTimeOfDay);
    setSuggestedDuration(activity.suggestedDuration);
    setLocation(activity.location);
    setLat(activity.latitude);
    setLng(activity.longitude);
    setShowButton(false);
    setIconColor("green");
    setIsButtonDisabled(true);
    setModalShow(false);
  };

  // when user clicks edit button, a request is sent to update the activity data in the db
  const handleOnEdit = (activity) => {
    const editedActivity = {
      name,
      date,
      timeOfDay,
      suggestedDuration,
      location,
      latitude,
      longitude,
      description,
      activityOrder: activity.activityOrder,
      photoUrl: activity.photoUrl,
      type: activity.type,
      id: activity.id,
      itineraryId: activity.itineraryId,
      createdAt: activity.createdAt,
      updatedAt: activity.updatedAt,
    };
    console.log(JSON.stringify(editedActivity));
    fetch(`${BACKEND_URL}/activity/${activity.id}/${userId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedActivity),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && !data.error) {
          // Update the UI based on the successful edit
          // e.g., find the activity in itineraryActivities and replace it with the editedActivity
          const updatedItineraryActivities = itineraryActivities.map(
            (itinerary) => {
              if (itinerary.id === activity.itineraryId) {
                return {
                  ...itinerary,
                  activities: itinerary.activities.map((act) =>
                    act.id === activity.id ? editedActivity : act
                  ),
                };
              }
              return itinerary;
            }
          );
          setItineraryActivities(updatedItineraryActivities);
          setModalShow(false);
          setTimeout(() => {
            alert("Successfully edited activity");
            console.log("Successfully edited activity");
          }, 100);
        } else {
          console.error("Could not edit activity:", data.msg);
        }
      })
      .catch((error) => {
        console.error("Network error:", error);
      });
  };

  // when user clicks delete button, a request is sent to delete the activity instance in the db
  const handleOnDelete = (activity) => {
    // Confirm the delete action with the user
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this activity?"
    );

    if (isConfirmed) {
      // Send the DELETE request to the server
      fetch(`${BACKEND_URL}/activity/${activity.id}/${userId}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then(() => {
          // Handle the successful deletion (e.g., update the UI)
          const updatedItineraryActivities = itineraryActivities.map(
            (itinerary) => {
              if (itinerary.id === activity.itineraryId) {
                return {
                  ...itinerary,
                  activities: itinerary.activities.filter(
                    (act) => act.id !== activity.id
                  ),
                };
              }
              return itinerary;
            }
          );

          setItineraryActivities(updatedItineraryActivities);
          setModalShow(false);
          // Notify user of successful deletion

          setTimeout(() => {
            alert("Successfully deleted activity");
            console.log("Successfully deleted activity");
          }, 100);
          // else {
          //   // Handle any errors during the deletion
          //   console.error("Could not delete activity:", data.message);
          // }
        })
        .catch((error) => {
          // Handle any network errors
          console.error("Network error:", error);
        });
    }
  };

  // console.log(JSON.stringify(itineraryActivities));

  return (
    <div>
      <Modal open={modalShow} onClose={handleOnClose}>
        <ModalDialog size="lg" variant="outlined" style={{ width: "500px" }}>
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
              Edit Itinerary Activity
            </Typography>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale="en-gb"
            >
              <DatePicker
                label="Date"
                value={date}
                onChange={(newValue) => {
                  setDateChanged(true);
                  setDate(newValue);
                  console.log(newValue);
                }}
                shouldDisableDate={disableDatesBeforeToday}
              />
            </LocalizationProvider>

            <FormControl style={{ display: "flex", marginTop: "15px" }}>
              <TextField
                id="activity-name"
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            <FormControl style={{ display: "flex", marginTop: "15px" }}>
              <TextField
                id="activity-description"
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                rows={2}
              />
            </FormControl>

            <FormControl style={{ display: "flex", marginTop: "15px" }}>
              <InputLabel id="activity-timeOfDay-label">Time of Day</InputLabel>
              <Select
                label="Time of Day"
                id="activity-timeOfDay"
                value={timeOfDay}
                onChange={(e) => setTimeOfDay(e.target.value)}
              >
                <MenuItem value={"Morning"}>Morning</MenuItem>
                <MenuItem value={"Afternoon"}>Afternoon</MenuItem>
                <MenuItem value={"Evening"}>Evening</MenuItem>
              </Select>
            </FormControl>

            <FormControl style={{ display: "flex", marginTop: "15px" }}>
              <TextField
                id="activity-duration"
                label="Suggested duration"
                value={suggestedDuration}
                onChange={(e) => setSuggestedDuration(e.target.value)}
              />
            </FormControl>

            <FormControl style={{ display: "flex", marginTop: "15px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <TextField
                  id="activity-location"
                  label="Location"
                  value={location}
                  onChange={handleLocationChange}
                  style={{ width: "100%" }}
                />
                {showButton && (
                  <>
                    <Button onClick={getLatLng}>Check</Button>
                    {iconColor === "green" ? (
                      <CheckCircleIcon style={{ color: "green" }} />
                    ) : iconColor === "red" ? (
                      <CancelIcon style={{ color: "red" }} />
                    ) : null}
                  </>
                )}
              </div>
            </FormControl>

            <div
              style={{
                display: "flex",
                marginTop: "15px",
                justifyContent: "space-between",
              }}
            >
              <Button
                variant="outlined"
                color="error"
                endIcon={<DeleteIcon />}
                style={{ marginRight: "5px" }}
                onClick={() => handleOnDelete(activity)}
              >
                Delete
              </Button>
              <Button
                variant="contained"
                endIcon={<CheckIcon />}
                disabled={isButtonDisabled || iconColor === "red"}
                onClick={() => handleOnEdit(activity)}
              >
                Edit
              </Button>
            </div>
          </Box>
        </ModalDialog>
      </Modal>
    </div>
  );
}
