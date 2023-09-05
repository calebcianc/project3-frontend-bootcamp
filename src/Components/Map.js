/* global google */
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useState, useEffect, useMemo } from "react";
import "./Map.css";

const Map = ({ itineraryActivities, value }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  const [
    arrayOfCoordinatesOfEachItinerary,
    setArrayOfCoordinatesOfEachItinerary,
  ] = useState(null);

  useEffect(() => {
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

    setArrayOfCoordinatesOfEachItinerary(arrayOfCoordinatesOfEachItinerary);
  }, [itineraryActivities]);

  const center = useMemo(() => {
    if (
      arrayOfCoordinatesOfEachItinerary &&
      arrayOfCoordinatesOfEachItinerary.length > 0
    ) {
      return {
        lat: arrayOfCoordinatesOfEachItinerary[0]["latitude"],
        lng: arrayOfCoordinatesOfEachItinerary[0]["longitude"],
      };
    } else {
      return { lat: 1.3521, lng: 103.8198 }; // Latitude and Longitude of Singapore
    }
  }, [arrayOfCoordinatesOfEachItinerary]);

  useEffect(() => {
    console.log(
      "arrayOfCoordinatesOfEachItinerary: ",
      JSON.stringify(arrayOfCoordinatesOfEachItinerary)
    );
  }, []);

  return (
    <div className="App" style={{ minWidth: "50%" }}>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={10}
        >
          {arrayOfCoordinatesOfEachItinerary
            ? arrayOfCoordinatesOfEachItinerary.map(
                (itineraryFirstActivity) => (
                  <Marker
                    position={{
                      lat: itineraryFirstActivity["latitude"],
                      lng: itineraryFirstActivity["longitude"],
                    }}
                  />
                )
              )
            : null}
        </GoogleMap>
      )}
    </div>
  );
};

export default Map;

// at the itineraryList view page, render bounds and markers based on the first activity in the itinerary
// at the activityList view page, render bounds and markers based on all the activities in the itinerary
