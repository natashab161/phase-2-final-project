
import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { getDatabase, ref, onValue } from "firebase/database";
import { Client } from "@googlemaps/google-maps-services-js";

const libraries = ["places"];
const mapContainerStyle = { width: "100%", height: "100%" };
const defaultCenter = { lat: 40.7128, lng: -74.0060 }; // Default map center (New York City)

const UserLocationsMap = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [markers, setMarkers] = useState([]);
  const [center, setCenter] = useState(defaultCenter);

  useEffect(() => {
    const db = getDatabase();

    const fetchLocations = async () => {
      // Fetch locations from Realtime Database
      const locationsRef = ref(db, "locations");
      onValue(locationsRef, async (snapshot) => {
        const locations = [];

        snapshot.forEach((childSnapshot) => {
          const locationData = childSnapshot.val();
          locations.push(locationData);
        });

        const client = new Client({});

        const geocodedLocations = await Promise.all(
          locations.map(async (location) => {
            const response = await client.geocode({
              params: {
                address: location.address,
                key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
              },
            });
            return {
              ...location,
              position: response.data.results[0].geometry.location,
            };
          })
        );

        setMarkers(geocodedLocations);
      });
    };

    fetchLocations();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Location permission granted.");
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log("Location permission denied.");
          setCenter(defaultCenter);
        }
      );
    } else {
      setCenter(defaultCenter);
    }
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={10} center={center}>
      {markers.map((marker, index) => (
        <Marker key={index} position={marker.position} />
      ))}
    </GoogleMap>
  );
};

export default UserLocationsMap;

