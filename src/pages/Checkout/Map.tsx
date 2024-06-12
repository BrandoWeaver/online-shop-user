import React from "react";
import { Box, Paper, Typography, useTheme } from "@mui/material";
import { GoogleMap, Marker } from "@react-google-maps/api";
import RoomIcon from "@mui/icons-material/Room";

interface DeliveryAddressProps {
  address: string;
  placeName: string;
  lat: number;
  lng: number;
}

const containerStyle = {
  width: "100%",
  height: "200px",
};

// const libraries: ("places" | "visualization" | "drawing" | "geometry")[] = [
//   "places",
//   "visualization",
// ];
const DeliveryAddress: React.FC<DeliveryAddressProps> = ({
  address,
  placeName,
  lat,
  lng,
}) => {
  const theme = useTheme();
  //   const { isLoaded } = useJsApiLoader({
  //     id: "google-map-script",
  //     googleMapsApiKey: process.env.REACT_APP_MAP_KEY || "",
  //     libraries,
  //   });

  const handleClick = () => {
    // Construct the URL with the latitude and longitude
    const url = `https://www.google.com/maps/search/?api=1&query=${11.5408896},${104.8674304}`;

    // Open the URL in a new tab
    window.open(url, "_blank");
  };
  //   if (!isLoaded) return null;
  //   console.log("name", address);
  return (
    <Paper elevation={3} sx={{ borderRadius: 2, p: 2, mb: 2 }}>
      <Typography
        variant="h6"
        sx={{ display: "flex", alignItems: "center", mb: 2 }}
      >
        <RoomIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
        Delivery Address
      </Typography>
      <Box sx={{ mb: 2 }}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{ lat, lng }}
          zoom={17}
          options={{
            fullscreenControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            zoomControl: false,
          }}
          onClick={handleClick}
        >
          <Marker position={{ lat, lng }} />
        </GoogleMap>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <RoomIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
        <Box>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {placeName}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {address || "NA"}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default DeliveryAddress;
