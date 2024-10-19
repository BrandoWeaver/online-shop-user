import { Box, Button } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useJsApiLoader } from "@react-google-maps/api";
import { Paper, Typography } from "@mui/material";
import { GoogleMap, Marker } from "@react-google-maps/api";
import RoomIcon from "@mui/icons-material/Room";
import theme from "../../themes";
import OrderSummary from "./OrderSumary";
import { CartContext } from "../../contexts/CartContext";
import { useAuthContext } from "../../contexts/AuthContext";
import CusDialog, {
  ICusDialogHandler,
} from "../../components/Dialog/CusDialog";
import { CusTextFieldBig } from "../../components/CusMuiCom/CusInputs";
import { useRequest } from "ahooks";
import { ORDER_API } from "../../api/Order";
import { LoadingSpiner } from "../../components/Loading";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../utils/route-util";
export const defaultCoord = { lat: 11.5752538, lng: 104.9000484 };
const libraries: ("places" | "visualization" | "drawing" | "geometry")[] = [
  "places",
  "visualization",
];
const containerStyle = {
  width: "100%",
  height: "200px",
};

const orderSummary = {
  subtotal: 0.0,
  packagingFee: 0.0,
  discount: 0.0,
  deliveryFee: 0.0,
  total: 0.0,
};
interface IcheckoutContent {}
function CheckoutContent(props: IcheckoutContent) {
  const { cart, getTotalPrice, clearCart } = useContext(CartContext)!;
  const { authState } = useAuthContext();
  const navigate = useNavigate();
  const openRef = useRef<ICusDialogHandler>(null);
  const [confirmOrder, setconfirmOrder] = useState({
    phone: "",
    name: "",
    note: "",
  });
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_MAP_KEY || "",
    libraries,
  });
  const [placeName, setPlaceName] = useState("");

  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  console.log("lateand land", currentLocation);

  useEffect(() => {
    // Fetch current location using Geolocation API
    const fetchCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log("navigator.geolocation", position);
          console.log("position", position);
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        });
      }
    };

    fetchCurrentLocation();
  }, []);

  useEffect(() => {
    const fetchPlaceName = async () => {
      if (currentLocation) {
        try {
          const apiKey = process.env.REACT_APP_MAP_KEY; // Fetch API key from environment variables
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${currentLocation.lat},${currentLocation.lng}&key=${apiKey}`
          );
          const results = response.data.results;
          console.log("result", response);
          if (results.length > 0) {
            const formattedAddress = results[0].formatted_address;
            console.log("Formatted Address", formattedAddress);
            setPlaceName(formattedAddress);
          } else {
            setPlaceName("No address found");
          }
        } catch (error) {
          console.error("Error fetching place name:", error);
          setPlaceName("Error fetching address");
        }
      }
    };

    fetchPlaceName();
  }, [currentLocation, placeName]);

  const handleClick = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${currentLocation?.lat},${currentLocation?.lng}`;
    window.open(url, "_blank");
  };
  const { loading: loadingCreateOrder, run: runCreateOrder } = useRequest(
    ORDER_API.createOrder,
    {
      onSuccess: (data) => {
        console.log("data", data);
        clearCart();
        openRef.current?.close();
        navigate(ROUTE_PATH.product);
      },
    }
  );
  const handleOrder = () => {
    const items = cart.map((value) => {
      return { product: value._id, quantity: value?.cartQuantity };
    });
    const orderData = {
      userId: authState.userId,
      userName: confirmOrder.name,
      lat: currentLocation?.lat || 0,
      lng: currentLocation?.lng || 0,
      items: items,
      phoneNumber: confirmOrder.phone,
      notes: confirmOrder.note,
      totalPrice: getTotalPrice(),
    };
    runCreateOrder(orderData);
  };

  if (!isLoaded) return null;

  return (
    <Box>
      <CusDialog maxWidth="lg" ref={openRef}>
        <Box>
          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center", pt: 2, pl: 2 }}
          >
            Confirm Order
          </Typography>
        </Box>
        <Box sx={{ px: 2 }}>
          <Typography variant="body2">Receive Name</Typography>
          <CusTextFieldBig
            size="small"
            margin="dense"
            required
            autoFocus
            autoComplete="current-password"
            onChange={(e) =>
              setconfirmOrder((prevState) => ({
                ...prevState,
                name: e.target.value,
              }))
            }
          />
        </Box>
        <Box sx={{ px: 2 }}>
          <Typography variant="body2">Receive Phone</Typography>
          <CusTextFieldBig
            size="small"
            margin="dense"
            required
            autoFocus
            onChange={(e) =>
              setconfirmOrder((prevState) => ({
                ...prevState,

                phone: e.target.value,
              }))
            }
            autoComplete="current-password"
          />
        </Box>
        <Box sx={{ px: 2 }}>
          <Typography variant="body2">Note</Typography>
          <CusTextFieldBig
            size="small"
            margin="dense"
            required
            autoFocus
            autoComplete="current-password"
            onChange={(e) =>
              setconfirmOrder((prevState) => ({
                ...prevState,

                note: e.target.value,
              }))
            }
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            pr: 2,
            pb: 2,
            mt: 2,
          }}
        >
          <Button onClick={() => openRef.current?.close()}>Cancel</Button>
          <Button variant="contained" onClick={handleOrder}>
            {loadingCreateOrder ? (
              <LoadingSpiner size={25} color="inherit" />
            ) : (
              "Ok"
            )}
          </Button>
        </Box>
      </CusDialog>
      <Box height={300}>
        <Paper elevation={0} sx={{ borderRadius: 2, p: 2, mb: 2 }}>
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
              center={currentLocation || defaultCoord}
              zoom={17}
              options={{
                fullscreenControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                zoomControl: false,
              }}
              onClick={handleClick}
            >
              <Marker position={currentLocation || defaultCoord} />
            </GoogleMap>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <RoomIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
            <Box>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {placeName}
              </Typography>
            </Box>
          </Box>
        </Paper>
        <OrderSummary
          restaurantName="Online Shop"
          items={cart}
          summary={orderSummary}
          totoalPrice={getTotalPrice()}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            px: 2,
            position: "sticky",
            background: "white",
            bottom: 0,
          }}
        >
          <Button
            color="primary"
            variant="contained"
            // disabled={!placeName}
            sx={{ borderRadius: 5, width: "100%", mb: 2, mt: 2 }}
            onClick={() => {
              if (authState?.isLogIn) {
                openRef.current?.open();
              } else {
                navigate(ROUTE_PATH.login);
              }
            }}
          >
            Place Order ${getTotalPrice().toFixed(2)}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default CheckoutContent;
