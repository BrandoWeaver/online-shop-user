import { Box, IconButton, Toolbar, Typography, useTheme } from "@mui/material";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckoutContent from "./CheckoutContent";
import { useAuthContext } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { ROUTE_PATH } from "../../utils/route-util";

export const defaultCoord = { lat: 11.5752041, lng: 104.9000041 };
function Checkout() {
  const { authState } = useAuthContext();
  const theme = useTheme();
  if (!authState?.isLogIn) {
    return <Navigate to={ROUTE_PATH.login} replace />;
  }
  return (
    <Box>
      <Toolbar
        sx={{ position: "sticky", top: 2, zIndex: 1, background: "white" }}
      >
        <IconButton
          edge="start"
          color="default"
          aria-label="back"
          onClick={() => {
            window.history.back();
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography
          variant="h6"
          style={{ flexGrow: 1, textAlign: "center" }}
          color={theme.palette.grey["700"]}
        >
          Checkout
        </Typography>
      </Toolbar>
      <CheckoutContent />
    </Box>
  );
}

export default Checkout;
