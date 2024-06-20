import React from "react";
import { Box, Typography, IconButton, Avatar } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
interface Props {
  numPhone: string | undefined;
  buyerName: string | undefined;
}
const ContactInfo = (props: Props) => {
  return (
    <Box display="flex" alignItems="center" padding="16px" bgcolor="#fff">
      <Avatar style={{ width: 40, height: 40, marginRight: 16 }} />
      <Box flexGrow={1}>
        <Typography
          variant="body1"
          component="div"
          style={{ fontWeight: "bold" }}
        >
          {props.buyerName || "NA"}
        </Typography>
        <Typography variant="body2" component="div" color="textSecondary">
          {"+855" + props.numPhone || "NA"}
        </Typography>
      </Box>
      <IconButton color="primary">
        <PhoneIcon style={{ color: "green" }} />
      </IconButton>
    </Box>
  );
};

export default ContactInfo;
