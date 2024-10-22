import React from "react";
import { Avatar, Typography, Box } from "@mui/material";
import theme from "../../themes";
import moment from "moment";

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
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 16px",
        borderBottom: `1px solid ${theme.palette.divider}`,
        "&:hover": {
          backgroundColor: theme.palette.action.hover,
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar
          sx={{ bgcolor: "#26a69a", mr: 2 }}
          src={`${process.env.REACT_APP_PUBLIC_URL}assets/images/logo.png`}
        />
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            {props.ownerName}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: props.status
                ? theme.palette.text.primary
                : theme.palette.grey["700"],
              fontWeight: props.status ? "normal" : "bold",
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
      <Typography
        variant="body2"
        sx={{
          color: props.status
            ? theme.palette.text.secondary
            : theme.palette.grey["700"],
          fontWeight: props.status ? "normal" : "bold",
          marginLeft: "auto",
        }}
      >
        {moment(props.date, "MMMM Do YYYY, h:mm:ss a").format(
          "MMM D, YYYY, h:mm:ss a"
        )}
      </Typography>
    </Box>
  );
};

export default MessagePreview;
