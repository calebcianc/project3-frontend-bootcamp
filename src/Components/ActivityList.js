import ActivityCard from "./ActivityCard";
import {
  CardMedia,
  Button,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GoogleIcon from "@mui/icons-material/Google";
import MicrosoftIcon from "@mui/icons-material/Microsoft";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { BACKEND_URL } from "../constants.js";

export default function ActivityList({
  selectedItinerary,
  setSelectedItinerary,
  itineraryActivities,
  setItineraryActivities,
  isHighlighted,
  setHighlighted,
  handleOnCardClick,
  userId,
}) {
  const handleGoBack = () => {
    setSelectedItinerary(null);
    setHighlighted(null);
  };

  const highlightedActivityCardRef = useRef(null); // Create reference for highlighted card
  // useEffect to cause highlighted card to scroll into view
  useEffect(() => {
    if (highlightedActivityCardRef.current) {
      highlightedActivityCardRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  });

  // extract itinerary from list based on itineraryId
  const itinerary = itineraryActivities.find(
    (item) => item.id === selectedItinerary
  );

  // code to group activities by date
  const groupByDate = (activities) => {
    return activities.reduce((acc, activity) => {
      const date = new Date(activity["date"]).toLocaleDateString("en-GB", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
      }); // Convert to string for easier comparison
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(activity);
      return acc;
    }, {});
  };

  // code to handle download of itinerary into excel or google sheet
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);
  const handleCloseDialog = () => {
    setShowDownloadDialog(false);
  };
  const downloadExcel = () => {
    window.open(`${BACKEND_URL}/download/excel/${itinerary.id}`);
  };
  const downloadGoogleSheet = () => {
    fetch(`${BACKEND_URL}/download/googleSheet/${itinerary.id}`)
      .then((response) => {
        console.log("Received response:", response);
        response.json().then((data) => {
          console.log("Received JSON data:", data);
          window.open(data.url, "_blank");
        });
      })
      .catch((err) => console.error(err));
  };
  const handleDownload = (type) => {
    setShowDownloadDialog(false);

    if (type === "excel") {
      downloadExcel();
    } else if (type === "googleSheet") {
      downloadGoogleSheet();
    }
  };

  return (
    <div
      style={{
        maxHeight: "calc(100vh - 64px - 56px )",
        // overflow: "auto",
      }}
    >
      <div style={{ display: "flex" }}>
        <div style={{ marginLeft: "4mm" }}>
          <Button startIcon={<ArrowBackIcon />} onClick={handleGoBack}>
            Go back
          </Button>
        </div>
        <div style={{ marginLeft: "auto", marginRight: "4mm" }}>
          <Button
            endIcon={<FileDownloadIcon />}
            onClick={() => setShowDownloadDialog(true)}
          >
            Download
          </Button>
        </div>
      </div>

      <Box
        position="relative"
        sx={{
          width: "calc(100% - 8mm)",
          margin: "auto",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            height: "140px",
            objectFit: "cover",
            borderRadius: "5px",
          }}
          image={itinerary.photoUrl ? itinerary.photoUrl : null}
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
          sx={{ borderRadius: "5px" }}
        >
          <Typography variant="h6">{itinerary.name}</Typography>
        </Box>
      </Box>

      <div
        style={{
          maxHeight: "calc(100vh - 64px - 56px - 36.5px - 140px)",
          overflow: "auto",
        }}
      >
        {itineraryActivities.map((element, index) => {
          const activities = element.activities;
          const filteredActivities = activities.filter(
            (activity) => activity.itineraryId === selectedItinerary
          );
          const sortedActivities = filteredActivities.sort((a, b) => {
            const dateA = new Date(a["date"]);
            const dateB = new Date(b["date"]);
            if (dateA < dateB) return -1;
            if (dateA > dateB) return 1;
            return a["activityOrder"] - b["activityOrder"];
          });

          const groupedActivities = groupByDate(sortedActivities);

          return (
            <div key={index}>
              {Object.keys(groupedActivities).map((date, dateIndex) => (
                <div
                  key={dateIndex}
                  style={{
                    margin: "4mm 4mm 6mm 4mm",
                  }}
                >
                  <div style={{ marginBottom: "10px", marginLeft: "5px" }}>
                    <b>{date}</b>
                  </div>
                  <div
                    style={{
                      backgroundColor: "whitesmoke",
                      padding: "1px 10px",
                      borderRadius: "5px",
                    }}
                  >
                    {groupedActivities[date].map((activity, activityIndex) => (
                      <div
                        key={activityIndex}
                        ref={
                          activity.id === isHighlighted
                            ? highlightedActivityCardRef
                            : null
                        }
                        onClick={() => handleOnCardClick(activity)}
                        style={{
                          margin: "10px 0px",
                        }}
                      >
                        <ActivityCard
                          activity={activity}
                          isHighlighted={isHighlighted}
                          userId={userId}
                          itineraryActivities={itineraryActivities}
                          setItineraryActivities={setItineraryActivities}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {showDownloadDialog && (
        <Dialog open={showDownloadDialog} close={handleCloseDialog}>
          <DialogTitle>Select Download Type</DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent style={{ padding: "16px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                gap: "20px", // Adding gap between buttons
              }}
            >
              <Button
                onClick={() => handleDownload("excel")}
                startIcon={<MicrosoftIcon />}
                style={{ margin: "8px" }} // Adding margin around buttons
                variant="outlined"
              >
                Excel
              </Button>
              <Button
                onClick={() => handleDownload("googleSheet")}
                startIcon={<GoogleIcon />}
                style={{ margin: "8px" }} // Adding margin around buttons
                variant="outlined"
              >
                Google Sheet
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
