/* global google */
import {
  GoogleMap,
  MarkerF,
  useLoadScript,
  InfoWindowF,
  PolylineF,
} from "@react-google-maps/api";
import { useState, useEffect, useMemo, useRef } from "react";
import "./Map.css";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone"); // dependent on utc plugin
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Singapore");

const Map = ({
  selectedItinerary,
  itineraryActivities,
  isHighlighted,
  setHighlighted,
  handleOnCardClick,
  appliedFilters,
  setAppliedFilters,
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  const mapRef = useRef(null);

  // useState & useEffect to get marker & polyline coordinates
  const [arrayOfCoordinates, setArrayOfCoordinates] = useState(null);
  useEffect(() => {
    if (selectedItinerary) {
      // console.log("itineraryActivities: ", JSON.stringify(itineraryActivities));

      const arrayOfCoordinatesOfEveryActivity = () => {
        const finditineraryById = itineraryActivities
          .filter((itinerary) => {
            // Filter based on start and end dates if they exist
            if (appliedFilters.startDate && appliedFilters.endDate) {
              const itineraryStartDate = dayjs(itinerary.startDate);
              const itineraryEndDate = dayjs(itinerary.endDate);
              if (
                itineraryStartDate.isBefore(appliedFilters.startDate) ||
                itineraryEndDate.isAfter(appliedFilters.endDate)
              ) {
                return false;
              }
            }

            // Filter based on country if it exists
            if (
              appliedFilters.country &&
              itinerary.country !== appliedFilters.country.label
            ) {
              return false;
            }

            // Filter based on category if it exists
            if (
              appliedFilters.category &&
              itinerary.category !== appliedFilters.category
            ) {
              return false;
            }

            return true; // Include the itinerary if none of the above conditions were met
          })
          .find((itinerary) => itinerary.id === selectedItinerary);

        const sortedActivities = finditineraryById.activities.sort((a, b) => {
          const dateA = new Date(a["date"]);
          const dateB = new Date(b["date"]);
          if (dateA < dateB) return -1;
          if (dateA > dateB) return 1;
          return a["activityOrder"] - b["activityOrder"];
        });
        const coordinates = sortedActivities.map((activity) => {
          return {
            id: activity.id,
            name: activity.name,
            latitude: activity.latitude,
            longitude: activity.longitude,
          };
        });
        // console.log("coordinates: ", JSON.stringify(coordinates));
        return coordinates;
      };
      setArrayOfCoordinates(arrayOfCoordinatesOfEveryActivity);
    } else {
      const arrayOfCoordinatesOfEachItinerary = itineraryActivities
        .filter((itinerary) => {
          // Filter based on start and end dates if they exist
          if (appliedFilters.startDate && appliedFilters.endDate) {
            const itineraryStartDate = dayjs(itinerary.startDate);
            const itineraryEndDate = dayjs(itinerary.endDate);
            if (
              itineraryStartDate.isBefore(appliedFilters.startDate) ||
              itineraryEndDate.isAfter(appliedFilters.endDate)
            ) {
              return false;
            }
          }

          // Filter based on country if it exists
          if (
            appliedFilters.country &&
            itinerary.country !== appliedFilters.country.label
          ) {
            return false;
          }

          // Filter based on category if it exists
          if (
            appliedFilters.category &&
            itinerary.category !== appliedFilters.category
          ) {
            return false;
          }

          return true; // Include the itinerary if none of the above conditions were met
        })
        .map((itinerary) => {
          const firstActivity = itinerary.activities.reduce(
            (minActivity, currentActivity) => {
              if (currentActivity.activityOrder < minActivity.activityOrder) {
                return currentActivity;
              }
              return minActivity;
            },
            itinerary.activities[0]
          );
          return {
            id: itinerary.id,
            name: itinerary.name,
            latitude: firstActivity.latitude,
            longitude: firstActivity.longitude,
          };
        });
      setArrayOfCoordinates(arrayOfCoordinatesOfEachItinerary);
    }
  }, [itineraryActivities, selectedItinerary, appliedFilters]);

  // coordinates to center the map on; to be changed to bounds instead
  const center = useMemo(() => {
    if (arrayOfCoordinates && arrayOfCoordinates.length > 0) {
      return {
        lat: arrayOfCoordinates[0]["latitude"],
        lng: arrayOfCoordinates[0]["longitude"],
      };
    } else {
      return { lat: 1.3521, lng: 103.8198 }; // Latitude and Longitude of Singapore
    }
  }, [arrayOfCoordinates]);

  const onLoad = (map) => {
    mapRef.current = map;
    if (arrayOfCoordinates && arrayOfCoordinates.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      arrayOfCoordinates.forEach((coordinate) => {
        if (coordinate.latitude && coordinate.longitude) {
          bounds.extend(
            new google.maps.LatLng(coordinate.latitude, coordinate.longitude)
          );
        }
      });
      map.fitBounds(bounds);

      if (!itineraryActivities || itineraryActivities.length <= 1) {
        const listener = google.maps.event.addListener(
          map,
          "idle",
          function () {
            if (map.getZoom() > 10) map.setZoom(10);
            google.maps.event.removeListener(listener);
          }
        );
      }
    }
  };

  // useEffect to change bounds depending on the coordinates (used when switching between itinerary and activity view)
  useEffect(() => {
    if (mapRef.current && arrayOfCoordinates && arrayOfCoordinates.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      arrayOfCoordinates.forEach((coordinate) => {
        if (coordinate.latitude && coordinate.longitude) {
          bounds.extend(
            new google.maps.LatLng(coordinate.latitude, coordinate.longitude)
          );
        }
      });
      mapRef.current.fitBounds(bounds);

      if (!itineraryActivities || itineraryActivities.length <= 1) {
        // Set zoom level after fitting bounds
        const zoomLevelToSet = 10; // Set your desired zoom level here
        mapRef.current.setZoom(zoomLevelToSet);
      }
    } else {
      // Set zoom and center to show the world map
      mapRef.current.setZoom(1); // Zoom out completely
      mapRef.current.setCenter(new google.maps.LatLng(0, 0)); // Center at (0,0)
    }
  }, [arrayOfCoordinates, appliedFilters]);

  return (
    <div className="App" style={{ minWidth: "50%" }}>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap mapContainerClassName="map-container" onLoad={onLoad}>
          {arrayOfCoordinates
            ? arrayOfCoordinates.map((itineraryFirstActivity, index) => (
                <>
                  <MarkerF
                    position={{
                      lat: itineraryFirstActivity["latitude"],
                      lng: itineraryFirstActivity["longitude"],
                    }}
                    onClick={() => {
                      handleOnCardClick(itineraryFirstActivity);
                    }}
                    icon={
                      selectedItinerary
                        ? index === 0 || index === arrayOfCoordinates.length - 1
                          ? "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                          : undefined
                        : undefined
                    }
                  />
                  {isHighlighted === itineraryFirstActivity.id ? (
                    <InfoWindowF
                      position={{
                        lat: itineraryFirstActivity["latitude"],
                        lng: itineraryFirstActivity["longitude"],
                      }}
                    >
                      <p>{itineraryFirstActivity.name}</p>
                    </InfoWindowF>
                  ) : null}
                </>
              ))
            : null}

          {selectedItinerary ? (
            <PolylineF
              path={arrayOfCoordinates.map((activity) => ({
                lat: activity["latitude"],
                lng: activity["longitude"],
              }))}
              options={{
                strokeColor: "black",
                strokeOpacity: 0,
                strokeWeight: 2,
                icons: [
                  {
                    icon: {
                      path: "M 0,-1 0,1",
                      strokeOpacity: 1,
                      scale: 4,
                    },
                    offset: "0",
                    repeat: "20px",
                  },
                ],
              }}
            />
          ) : null}
        </GoogleMap>
      )}
    </div>
  );
};

export default Map;
