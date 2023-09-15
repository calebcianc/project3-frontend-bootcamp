import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useState } from "react";

export default function RightContainerFilterButton({ filters, setFilters }) {
  const handleFilterItinerary = () => {
    return alert("test");
  };

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const [openModal, setOpenModal] = useState(false);

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
        <DialogTitle>Filter Itineraries</DialogTitle>
        <DialogContent>
          <TextField
            label="Country"
            name="country"
            value={filters.country}
            onChange={handleChange}
          />
          <TextField
            label="Start Date"
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleChange}
          />
          <TextField
            label="End Date"
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleChange}
          />
          <TextField
            label="People"
            name="people"
            value={filters.people}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button
            onClick={() => {
              handleApply(filters);
              setOpenModal(false);
            }}
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
