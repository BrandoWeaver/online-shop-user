import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
interface Props {
  orderId: string | null;
}
const CustomToolbar = (props: Props) => {
  const sliceOrderId = props.orderId?.slice(0, 4);
  return (
    <AppBar
      position="sticky"
      style={{ backgroundColor: "#f5f5f5", color: "#000", top: "0px" }}
    >
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="back"
          onClick={() => {
            window.history.back();
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Box>
          <Typography
            variant="h6"
            component="div"
            style={{ fontWeight: "bold" }}
          >
            Order #{sliceOrderId}
          </Typography>
        </Box>
        <Box></Box>
      </Toolbar>
    </AppBar>
  );
};

export default CustomToolbar;
