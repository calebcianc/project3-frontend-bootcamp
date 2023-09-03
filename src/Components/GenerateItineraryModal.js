import { useState } from "react";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { countries } from "../Data/Countries";
import { categories } from "../Data/Categories";

export default function GenerateItineraryModal({
  modalView,
  handleClose,
  itineraryActivities,
  setItineraryActivities,
}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [userId, setUserId] = useState(1); // to write code to get the userId when logged in
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [maxPax, setMaxPax] = useState(1);
  const [genderPreference, setGenderPreference] = useState(null);

  // Validation function to be called before submitting form
  const isFormValid = () => {
    if (!name.trim()) {
      // alert("Name cannot be empty");
      return false;
    }
    if (startDate >= endDate) {
      // alert("Start date must be earlier than end date");
      return false;
    }
    if (!country) {
      // alert("Please select a country");
      return false;
    }
    if (!category) {
      // alert("Please select a category");
      return false;
    }
    return true;
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    // console.log("Name: ", name);
  };

  const disableDatesBeforeToday = (date) => {
    // Get yesterday's date
    const yesterday = dayjs().subtract(1, "day");
    // Disable dates up to and including yesterday
    return date <= yesterday;
  };

  const disableDatesBeforeStartDate = (date) => {
    // Disable dates up to and including the start date
    return date <= startDate;
  };

  const handlePublicChange = (event) => {
    const value = event.target.value;
    setIsPublic(value === "true");
  };

  const handleGenderChange = (event) => {
    setGenderPreference(event.target.value);
  };

  async function handleGenerateItinerary(event) {
    event.preventDefault();
    const prompts = {
      startDate,
      endDate,
      country,
      category,
    };

    const itineraryInputs = {
      name,
      prompts,
      isPublic,
      maxPax,
      genderPreference,
      userId,
    };

    // prints out contents of itineraryInputs - ok so far (Caleb, 2 Sep)
    console.log("Itinerary inputs: ", JSON.stringify(itineraryInputs));

    try {
      const response = await fetch("http://localhost:3000/itinerary/new", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(itineraryInputs),
      });
      const newItineraryDetails = await response.json();
      setItineraryActivities(newItineraryDetails);
      console.log("Data received: ", itineraryActivities);
    } catch (error) {
      console.error("Error: ", error);
    }

    handleClose();
  }

  return (
    <div>
      <Modal open={modalView} onClose={handleClose}>
        <ModalDialog size="lg" variant="outlined" layout="fullscreen">
          <ModalClose />
          <Box component="form">
            <Typography
              component="h2"
              id="modal-title"
              level="h4"
              textColor="inherit"
              fontWeight="lg"
              mb={3}
            >
              Generate your ideal itinerary!
            </Typography>

            <label htmlFor="name">Name your itinerary: </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
            />

            <br />
            <br />
            <div style={{ display: "flex" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Start date"
                  value={startDate}
                  onChange={(newValue) => {
                    setStartDate(newValue);
                    console.log(newValue);
                  }}
                  shouldDisableDate={disableDatesBeforeToday}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disabled={!startDate}
                  label="End date"
                  value={endDate}
                  onChange={(newValue) => {
                    setEndDate(newValue);
                  }}
                  shouldDisableDate={disableDatesBeforeStartDate}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <br />
            <Autocomplete
              id="country-select"
              sx={{ width: 300 }}
              options={countries}
              autoHighlight
              onChange={(event, newValue) => {
                setCountry(newValue.label);
              }}
              getOptionLabel={(option) => option.label}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  <img
                    loading="lazy"
                    width="20"
                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                    alt=""
                  />
                  {option.label}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Choose a country"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password", // disable autocomplete and autofill
                  }}
                />
              )}
            />
            <br />
            <Autocomplete
              id="category-select"
              sx={{ width: 300 }}
              options={categories}
              autoHighlight
              onChange={(event, newValue) => {
                setCategory(newValue);
              }}
              getOptionLabel={(option) => option}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  {option}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Choose a category"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password", // disable autocomplete and autofill
                  }}
                />
              )}
            />
            <br />
            <FormControl>
              <FormLabel id="is-public">
                Make your itinerary private or public?
              </FormLabel>
              <RadioGroup
                aria-labelledby="gender-preference"
                name="controlled-radio-buttons-group"
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
            <br />
            {isPublic === false ? null : (
              <div>
                <>
                  <label htmlFor="max-pax">
                    How many people do you want in your group?
                  </label>
                  <input
                    type="number"
                    id="max-pax"
                    placeholder="Type a number..."
                    value={maxPax}
                    onChange={(event, val) => setMaxPax(val)}
                    min="1"
                  />
                </>
                <br />
                <br />
                <FormControl>
                  <FormLabel id="gender-preference">
                    Gender Preference
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="gender-preference"
                    name="controlled-radio-buttons-group"
                    value={genderPreference}
                    onChange={handleGenderChange}
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
              </div>
            )}
            <button disabled={!isFormValid()} onClick={handleGenerateItinerary}>
              Generate itinerary
            </button>
          </Box>
        </ModalDialog>
      </Modal>
    </div>
  );
}
