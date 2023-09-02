import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import {
  Unstable_NumberInput as NumberInput,
  NumberInputProps,
  numberInputClasses,
} from "@mui/base/Unstable_NumberInput";
import { DatePicker } from "@mui/x-date-pickers";
import { countries } from "../Data/Countries";
import { categories } from "../Data/Categories";

export default function GenerateItineraryModal({ modalView, handleClose }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [name, setName] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [country, setCountry] = useState(null);
  const [category, setCategory] = useState(null);
  const [isPublic, setIsPublic] = useState(false);
  const [maxPax, setMaxPax] = useState(1);
  const [genderPreference, setGenderPreference] = useState("any");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEndDateChange = (newValue) => {
    if (startDate && newValue && newValue < startDate) {
      setEndDate(null);
    } else {
      setEndDate(newValue);
    }
  };

  const handlePublicChange = (event) => {
    const value = event.target.value;
    setIsPublic(value === "true");
  };

  const handleGenderChange = (event) => {
    setGenderPreference(event.target.value);
  };

  async function handleGenerateItinerary() {
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
    };

    try {
      const response = await fetch("http://localhost:3001/generateItinerary", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(itineraryInputs),
      });
      const itineraryDetails = await response.json();
      console.log("Data received: ", itineraryDetails);
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  return (
    <div>
      <Modal open={modalView} onClose={handleClose}>
        <Box sx={style} component="form">
          <h1>Generate your ideal itinerary!</h1>

          <form>
            <label htmlFor="name">Name your itinerary: </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
            />
          </form>
          <br />
          <div style={{ display: "flex" }}>
            <FormControl>
              <DatePicker
                label="Choose a start date"
                value={startDate}
                onChange={(newValue) => {
                  setStartDate(newValue);
                  console.log(newValue);
                }}
              />
            </FormControl>

            <FormControl>
              <DatePicker
                label="Choose an end date"
                value={endDate}
                onChange={(newValue) => handleEndDateChange(newValue)}
              />
            </FormControl>
          </div>
          <br />
          <Autocomplete
            id="country-select"
            sx={{ width: 300 }}
            options={countries}
            autoHighlight
            onChange={(event, newValue) => {
              setCountry(newValue);
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

          {isPublic == "private" ? null : (
            <div>
              <form>
                <label for="max-pax">
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
              </form>
              <br />
              <FormControl>
                <FormLabel id="gender-preference">Gender Preference</FormLabel>
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
            </div>
          )}
          <br />

          <button onClick={handleGenerateItinerary}>Generate itinerary</button>
        </Box>
      </Modal>
    </div>
  );
}
