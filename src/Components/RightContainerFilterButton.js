import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  Autocomplete,
  Box,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useState, useEffect } from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { countries } from "../Data/Countries";
import { categories } from "../Data/Categories";
var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone"); // dependent on utc plugin
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Singapore");

export default function RightContainerFilterButton({ filters, setFilters }) {
  const [openModal, setOpenModal] = useState(false);

  const handleFilterItinerary = () => {
    setOpenModal(true);
    // return alert("test");
  };

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const disableDatesBeforeToday = (date) => {
    // Get yesterday's date
    const yesterday = dayjs().subtract(1, "day");
    // Disable dates up to and including yesterday
    return date <= yesterday;
  };

  const disableDatesBeforeStartDate = (date) => {
    // Disable dates up to and including the start date
    return date <= filters.startDate;
  };

  // When startDate changes, update endDate to point to the same month
  useEffect(() => {
    if (filters.startDate) {
      // Clone the Day.js object to avoid mutations and add 1 day
      const nextDay = dayjs(filters.startDate).add(1, "day");
      setFilters((prevFilters) => ({
        ...prevFilters,
        endDate: nextDay,
      }));
    }
  }, [filters.startDate]);

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          marginLeft: "auto",
          // marginTop: "4mm",
          marginRight: "4mm",
        }}
      >
        <Button endIcon={<FilterAltIcon />} onClick={handleFilterItinerary}>
          Filter
        </Button>
      </div>

      <Dialog
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
      >
        <DialogTitle style={{ padding: "24px" }}>
          Filter Itineraries
        </DialogTitle>

        <DialogContent>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "5px",
              }}
            >
              <Grid item>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="en-gb"
                >
                  <DatePicker
                    label="Start date"
                    value={filters.startDate}
                    onChange={(newStartDate) => {
                      setFilters((prevFilters) => ({
                        ...prevFilters,
                        startDate: newStartDate,
                      }));
                    }}
                    shouldDisableDate={disableDatesBeforeToday}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="en-gb"
                >
                  <DatePicker
                    label="End date"
                    value={filters.endDate}
                    onChange={(newEndDate) => {
                      setFilters((prevFilters) => ({
                        ...prevFilters,
                        endDate: newEndDate,
                      }));
                    }}
                    shouldDisableDate={disableDatesBeforeToday}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              {/* <TextField
                fullWidth
                label="Country"
                name="country"
                value={filters.country}
                onChange={handleChange}
              /> */}
              <Autocomplete
                id="country-select"
                sx={{ width: 300 }}
                options={countries}
                autoHighlight
                onChange={(event, newCountry) => {
                  setFilters((prevFilters) => ({
                    ...prevFilters,
                    country: newCountry.labe,
                  }));
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
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="People"
                name="people"
                value={filters.people}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions style={{ padding: "24px" }}>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button
            onClick={() => {
              // handleApply(filters);
              setOpenModal(false);
            }}
            variant="contained"
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
