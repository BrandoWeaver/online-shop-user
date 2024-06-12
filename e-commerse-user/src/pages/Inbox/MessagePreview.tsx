import React from "react";
import { Avatar, Typography, Box } from "@mui/material";
import theme from "../../themes";
interface Imessage {
  ownerName: string;
  messageBody: string;
  date: string;
  image: string;
  status: boolean;
}
const MessagePreview = (props: Imessage) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        // justifyContent: "space-between",
        padding: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          // justifyContent: "space-between",
        }}
      >
        <Box sx={{ marginLeft: "10px", display: "flex", alignItems: "center" }}>
          <Avatar sx={{ bgcolor: "#26a69a", mr: 1 }} src={props.image} />
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              {props.ownerName}
            </Typography>
            <Typography
              variant="body2"
              fontWeight={props.status ? "" : "bold"}
              sx={{
                color: props.status ? "" : theme.palette.grey["700"],
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {props.messageBody}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", ml: 5 }}>
          <Typography
            variant="body2"
            sx={{ color: props.status ? "" : theme.palette.grey["700"] }}
            fontWeight={props.status ? "" : "bold"}
          >
            {props.date}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MessagePreview;
