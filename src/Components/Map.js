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

const Map = ({
  selectedItinerary,
  itineraryActivities,
  isHighlighted,
  setHighlighted,
  handleOnCardClick,
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  const mapRef = useRef(null);

  // useState & useEffect to get marker & polyline coordinates
  const [arrayOfCoordinates, setArrayOfCoordinates] = useState(null);
  // const [pathCoordinates, setPathCoordinates] = useState(null);
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
            name: itinerary.name,
            latitude: firstActivity.latitude,
            longitude: firstActivity.longitude,
          };
        }
      );
      setArrayOfCoordinates(arrayOfCoordinatesOfEachItinerary);
    }

    //   if (arrayOfCoordinates) {
    //     const pathCoordinates = arrayOfCoordinates.map(
    //       (itineraryFirstActivity) => ({
    //         lat: itineraryFirstActivity.latitude,
    //         lng: itineraryFirstActivity.longitude,
    //       })
    //     );
    //     setPathCoordinates(pathCoordinates);
    //   }
  }, [itineraryActivities, selectedItinerary]);

  // empty pathCoordinates once selectedItinerary changes
  // useEffect(() => {
  //   if (pathCoordinates) {
  //     setPathCoordinates(null);
  //   }
  // }, [selectedItinerary]);

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
    }
  }, [arrayOfCoordinates]);

  // const [isOpen, setIsOpen] = useState(false);
  // const [infoWindowData, setInfoWindowData] = useState();
  // const handleMarkerClick = (
  //   id,
  //   lat,
  //   lng,
  //   amount,
  //   currency,
  //   category,
  //   description,
  //   date,
  //   displayAmount,
  //   displayCurrency
  // ) => {
  //   setIsOpen(false);
  //   mapRef?.panTo({ lat, lng });
  //   setInfoWindowData({
  //     id,
  //     amount,
  //     currency,
  //     category,
  //     description,
  //     date,
  //     displayAmount,
  //     displayCurrency,
  //   });
  //   setIsOpen(true);
  // };
  // listens for changes to the highlighted state and triggers the handleMarkerClick function to open the infoWindow of highlighted expense
  // useEffect(() => {
  //   if (expensesCategory) {
  //     const highlightedExpense = expensesCategory.find(
  //       (expense) => expense.id === isHighlighted
  //     );
  //     if (highlightedExpense) {
  //       const {
  //         id,
  //         lat,
  //         lng,
  //         amount,
  //         currency,
  //         category,
  //         description,
  //         date,
  //         displayAmount,
  //         displayCurrency,
  //       } = highlightedExpense;
  //       handleMarkerClick(
  //         id,
  //         lat,
  //         lng,
  //         amount,
  //         currency,
  //         category,
  //         description,
  //         date,
  //         displayAmount,
  //         displayCurrency
  //       );
  //     } else {
  //       setIsOpen(false);
  //     }
  //   }
  // }, [isHighlighted]);

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
                <>
                  <MarkerF
                    position={{
                      lat: itineraryFirstActivity["latitude"],
                      lng: itineraryFirstActivity["longitude"],
                    }}
                    onClick={() => {
                      handleOnCardClick(itineraryFirstActivity);
                      // handleMarkerClick(itineraryFirstActivity);
                    }}
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

// at the itineraryList view page, render bounds and markers based on the first activity in the itinerary
// at the activityList view page, render bounds and markers based on all the activities in the itinerary
