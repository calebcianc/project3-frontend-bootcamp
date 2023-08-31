import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
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

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [country, setCountry] = useState(null);
  const [category, setCategory] = useState(null);

  const handleEndDateChange = (newValue) => {
    if (startDate && newValue && newValue < startDate) {
      setEndDate(null);
    } else {
      setEndDate(newValue);
    }
  };

  async function handleGenerateItinerary() {
    const itineraryInputs = {
      startDate,
      endDate,
      country,
      category,
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
          <br />
          <br />
          <FormControl>
            <DatePicker
              label="Choose an end date"
              value={endDate}
              onChange={(newValue) => handleEndDateChange(newValue)}
            />
          </FormControl>
          <br />
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

          <button onClick={handleGenerateItinerary}>Generate itinerary</button>
        </Box>
      </Modal>
    </div>
  );
}
