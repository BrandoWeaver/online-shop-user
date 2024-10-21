import React from "react";
import { Box, Typography, Divider } from "@mui/material";
interface Props {
  totalPrice: number | undefined;
}
const FeeBreakdown = (props: Props) => {
  const subtotal = 0.0;
  const deliveryFee = 0.0;
  const discount = 0.0;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Fee Breakdown
      </Typography>
      <Box display="flex" justifyContent="space-between" mb={1}>
        <Typography variant="body1">Subtotal</Typography>
        <Typography variant="body1">
          {" "}
          ${props?.totalPrice && props?.totalPrice.toFixed(2)}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" mb={1}>
        <Typography variant="body1">Delivery Fee</Typography>
        <Typography variant="body1">${deliveryFee.toFixed(2)}</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="body1">Discount</Typography>
        <Typography variant="body1" color="error">
          -${Math.abs(discount).toFixed(2)}
        </Typography>
      </Box>
      <Divider />
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Typography variant="h6">Total Payable</Typography>
        <Typography variant="h6">
          ${props?.totalPrice && props?.totalPrice.toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
};

export default FeeBreakdown;
