import React from "react";
import { Button, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const CheckoutButton = ({
  count,
  total,
  handleOnClick,
}: {
  count: number;
  total: number;
  handleOnClick?: () => void;
}) => {
  return (
    <Button
      disabled={total <= 0}
      onClick={() => {
        handleOnClick && handleOnClick();
      }}
      variant="contained"
      color="primary"
      size="large"
      sx={{ width: "100%", borderRadius: 10 }}
    >
      <Typography
        variant="button"
        sx={{ color: "white", marginLeft: "8px", flexGrow: 1 }}
      >
        Checkout • ${total.toFixed(2)}
      </Typography>
      <ArrowForwardIosIcon sx={{ color: "white" }} />
    </Button>
  );
};

export default CheckoutButton;
