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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Autocomplete from "@mui/material/Autocomplete";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { countries } from "../Data/Countries";
import { categories } from "../Data/Categories";
import { CircularProgress } from "@mui/joy";
import "./LoadingSpinner.css";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Geocode from "react-geocode";
import { useNavigate, Link } from "react-router-dom";

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
}) {
  // Details of an activity that a user might want to change: date name description timeOfDay suggestedDuration location
  const [date, setDate] = useState(dayjs(activity.date));
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
  const [lat, setLat] = useState(activity.latitude);
  const [lng, setLng] = useState(activity.longitude);
  const [showButton, setShowButton] = useState(false);

  console.log("activityDate: ", activity.date);
  const disableDatesBeforeToday = (date) => {
    // Get yesterday's date
    const yesterday = dayjs().subtract(1, "day");
    // Disable dates up to and including yesterday
    return date <= yesterday;
  };

  const handleLocationChange = (e) => {
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
      },
      (error) => {
        console.error(error);
        setLat(null);
        setLng(null);
      }
    );
  };

  return (
    <div>
      <Modal open={modalShow} onClose={() => setModalShow(false)}>
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
                />
                {showButton && (
                  <Button onClick={getLatLng}>Check Location</Button>
                )}
                {lat !== null && lng !== null ? (
                  <CheckCircleIcon style={{ color: "green" }} />
                ) : lat === null && lng === null && location ? (
                  <CancelIcon style={{ color: "red" }} />
                ) : null}
              </div>
            </FormControl>

            {JSON.stringify(activity)}
          </Box>
        </ModalDialog>
      </Modal>
    </div>
  );
}
