/* global google */
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useState, useEffect, useMemo, useRef } from "react";
import "./Map.css";

const Map = ({ selectedItinerary, itineraryActivities }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  const mapRef = useRef(null);

  // useState & useEffect to get marker coordinates
  const [arrayOfCoordinates, setArrayOfCoordinates] = useState(null);
  useEffect(() => {
    if (selectedItinerary) {
      // console.log("itineraryActivities: ", JSON.stringify(itineraryActivities));

      const arrayOfCoordinatesOfEveryActivity = () => {
        const finditineraryById = itineraryActivities.find(
          (itinerary) => itinerary.id === selectedItinerary
        );

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
            latitude: activity.latitude,
            longitude: activity.longitude,
          };
        });
        // console.log("coordinates: ", JSON.stringify(coordinates));
        return coordinates;
      };
      setArrayOfCoordinates(arrayOfCoordinatesOfEveryActivity);
    } else {
      const arrayOfCoordinatesOfEachItinerary = itineraryActivities.map(
        (itinerary) => {
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
            latitude: firstActivity.latitude,
            longitude: firstActivity.longitude,
          };
        }
      );
      setArrayOfCoordinates(arrayOfCoordinatesOfEachItinerary);
    }
  }, [itineraryActivities, selectedItinerary]);

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

      // const listener = google.maps.event.addListener(map, "idle", function () {
      //   if (map.getZoom() > 10) map.setZoom(10);
      //   google.maps.event.removeListener(listener);
      // });
    }
  };

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

      // Set zoom level after fitting bounds
      // const zoomLevelToSet = 10; // Set your desired zoom level here
      // mapRef.current.setZoom(zoomLevelToSet);
    }
  }, [arrayOfCoordinates]);

  return (
    <div className="App" style={{ minWidth: "50%" }}>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          onLoad={onLoad}
          // zoom={10}
          // center={center}
        >
          {arrayOfCoordinates
            ? arrayOfCoordinates.map((itineraryFirstActivity) => (
                <Marker
                  position={{
                    lat: itineraryFirstActivity["latitude"],
                    lng: itineraryFirstActivity["longitude"],
                  }}
                />
              ))
            : null}
        </GoogleMap>
      )}
    </div>
  );
};

export default Map;

// at the itineraryList view page, render bounds and markers based on the first activity in the itinerary
// at the activityList view page, render bounds and markers based on all the activities in the itinerary
