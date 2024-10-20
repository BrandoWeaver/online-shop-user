import React from "react";
import { Box, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
interface Props {
  deliverAdd: string | undefined;
}
const DeliveryAddress = (props: Props) => {
  return (
    <Box display="flex" alignItems="center">
      <HomeIcon color="primary" />
      <Typography variant="body1" ml={1}>
        {props.deliverAdd || "NA"}
      </Typography>
    </Box>
  );
};

export default DeliveryAddress;
