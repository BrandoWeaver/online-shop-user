import { useRequest } from "ahooks";
import React, { useRef } from "react";
import { ORDER_API } from "../../api/Order";
import { ICusDialogHandler } from "../../components/Dialog/CusDialog";
import { Box } from "@mui/material";
import CustomToolbar from "./CusToolBar";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import SwipeableEdgeDrawer from "./SwipableDrawer";
export const defaultCoord = { lat: 11.5752538, lng: 104.9000484 };
const libraries: ("places" | "visualization" | "drawing" | "geometry")[] = [
  "places",
  "visualization",
];
const containerStyle = {
  width: "100%",
  height: "600px",
};
function OrderDetail() {
  const openRef = useRef<ICusDialogHandler>(null);
  const orderId = new URLSearchParams(window.location.search).get("orderId");
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_MAP_KEY || "",
    libraries,
  });
  const { data: orderDetail } = useRequest(
    () => ORDER_API.orderDetail(orderId || ""),
    {
      ready: orderId !== undefined,
      onSuccess: (data) => {
        console.log("dataOrderedDetail", data);
        openRef.current?.close();
      },
    }
  );
  if (!isLoaded) return null;
  return (
    <Box>
      <CustomToolbar orderId={orderId} />
      <Box sx={{ mb: 2 }}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={
            { lat: orderDetail?.lat || -1, lng: orderDetail?.lng || -1 } ||
            defaultCoord
          }
          zoom={17}
          options={{
            fullscreenControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            zoomControl: false,
          }}
          //   onClick={handleClick}
        >
          <Marker
            position={
              { lat: orderDetail?.lat || -1, lng: orderDetail?.lng || -1 } ||
              defaultCoord
            }
          />
        </GoogleMap>
      </Box>
      <SwipeableEdgeDrawer orderDetail={orderDetail} />
    </Box>
  );
}

export default OrderDetail;
