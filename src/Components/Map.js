/* global google */
import {
  GoogleMap,
  MarkerF,
  useLoadScript,
  InfoWindowF,
  PolylineF,
} from "@react-google-maps/api";
import { useState, useEffect, useRef } from "react";
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
  // code relating to getting google maps from server
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  const mapRef = useRef(null);

  // useState & useEffect to get marker & polyline coordinates
  const [arrayOfCoordinates, setArrayOfCoordinates] = useState(null);
  useEffect(() => {
    // if user has selected an itinerary, push the coordinates of the activities within the itinerary into arrayOfCoordinates
    if (selectedItinerary) {
      const arrayOfCoordinatesOfEveryActivity = () => {
        const finditineraryById = itineraryActivities
          // apply filters to the itineraryActivities - not actually needed
          // .filter((itinerary) => {
          //   // Filter based on start and end dates if they exist
          //   if (appliedFilters.startDate && appliedFilters.endDate) {
          //     const itineraryStartDate = dayjs(itinerary.startDate);
          //     const itineraryEndDate = dayjs(itinerary.endDate);
          //     if (
          //       itineraryStartDate.isBefore(appliedFilters.startDate) ||
          //       itineraryEndDate.isAfter(appliedFilters.endDate)
          //     ) {
          //       return false;
          //     }
          //   }

          //   // Filter based on country if it exists
          //   if (
          //     appliedFilters.country &&
          //     itinerary.country !== appliedFilters.country.label
          //   ) {
          //     return false;
          //   }

          //   // Filter based on category if it exists
          //   if (
          //     appliedFilters.category &&
          //     itinerary.category !== appliedFilters.category
          //   ) {
          //     return false;
          //   }

          //   return true; // Include the itinerary if none of the above conditions were met
          // })
          // assign the itinerary data to finditineraryById
          .find((itinerary) => itinerary.id === selectedItinerary);

        // sort the activities by date and activityOrder
        const sortedActivities = finditineraryById.activities.sort((a, b) => {
          const dateA = new Date(a["date"]);
          const dateB = new Date(b["date"]);
          if (dateA < dateB) return -1;
          if (dateA > dateB) return 1;
          return a["activityOrder"] - b["activityOrder"];
        });

        // map through the array of sortedActivities and assign the array of coordinates of each activity to the const variable coordinates
        const coordinates = sortedActivities.map((activity) => {
          return {
            id: activity.id,
            name: activity.name,
            latitude: activity.latitude,
            longitude: activity.longitude,
          };
        });

        return coordinates;
      };

      // set the arrayOfCoordinates value to the newly declared and assigned const variable coordinates
      setArrayOfCoordinates(arrayOfCoordinatesOfEveryActivity);
    } else if (
      selectedItinerary === null &&
      (!Array.isArray(itineraryActivities) || itineraryActivities.length === 0)
    ) {
      // if user has not selected any itinerary
      const arrayOfCoordinatesOfEachItinerary = itineraryActivities

        // filter the itineraryActivities based on the criteria selected
        .filter((itinerary) => {
          // Filter based on start and end dates if they exist
          if (appliedFilters.startDate && appliedFilters.endDate) {
            const itineraryStartDate = dayjs(itinerary.prompts.startDate);
            const itineraryEndDate = dayjs(itinerary.prompts.endDate);
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
            itinerary.prompts.country !== appliedFilters.country.label
          ) {
            return false;
          }

          // Filter based on category if it exists
          if (
            appliedFilters.category &&
            itinerary.prompts.category !== appliedFilters.category
          ) {
            return false;
          }

          return true; // Include the itinerary if none of the above conditions were met
        })

        // map through the filtered JSON data to push the id, name, lat, and lng, of the first activity of the filtered list of itineraries into an array const arrayOfCoordinatesOfEachItinerary
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

      // set the value of the arrayOfCoordiantes to the const variable arrayOfCoordinatesOfEachItinerary
      setArrayOfCoordinates(arrayOfCoordinatesOfEachItinerary);
    } else setArrayOfCoordinates(null);
  }, [itineraryActivities, selectedItinerary, appliedFilters]);

  // instructions on how to load the map e.g., what bounds to set
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

      // if there are no itineraries or if there is only one, set the zoom of the map to level 10
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
    if (mapRef.current) {
      // Check if the map is available
      if (arrayOfCoordinates && arrayOfCoordinates.length > 0) {
        // Check if there are any coordinates
        const bounds = new google.maps.LatLngBounds();

        // Extend the map bounds to include all coordinates
        arrayOfCoordinates.forEach((coordinate) => {
          if (coordinate.latitude && coordinate.longitude) {
            bounds.extend(
              new google.maps.LatLng(coordinate.latitude, coordinate.longitude)
            );
          }
        });

        // If there is only one set of coordinates, set zoom to 10
        if (arrayOfCoordinates.length === 1) {
          mapRef.current.fitBounds(bounds);
          mapRef.current.setZoom(10);
        } else {
          // If there is more than one set of coordinates, fit bounds
          mapRef.current.fitBounds(bounds);
        }
      } else {
        // If there are no coordinates, set zoom to 1 and center to show the world map
        mapRef.current.setZoom(1);
        mapRef.current.setCenter(new google.maps.LatLng(0, 0));
      }
    }
  }, [itineraryActivities, arrayOfCoordinates, appliedFilters]);

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
                  >
                    {isHighlighted === itineraryFirstActivity.id && (
                      <InfoWindowF
                        position={{
                          lat: itineraryFirstActivity["latitude"],
                          lng: itineraryFirstActivity["longitude"],
                        }}
                      >
                        <p>{itineraryFirstActivity.name}</p>
                      </InfoWindowF>
                    )}
                  </MarkerF>
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
