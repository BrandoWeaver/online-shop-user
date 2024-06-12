import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import FireIcon from "@mui/icons-material/Whatshot"; // Using the "Whatshot" icon as a fire icon
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
interface Isection {
  title: string;
  onClick: () => void;
}
const SectionHeader = (props: Isection) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={2}
    >
      <Box display="flex" alignItems="center">
        <FireIcon
          style={{ color: "green", fontSize: "24px", marginRight: "8px" }}
        />
        <Typography variant="h6" component="h2" style={{ fontWeight: "bold" }}>
          {props.title}
        </Typography>
      </Box>
      <IconButton
        href="#"
        size="small"
        onClick={() => {
          props.onClick();
        }}
      >
        <Typography
          variant="body1"
          style={{ color: "blue", fontWeight: "bold", marginRight: "4px" }}
        >
          See More
        </Typography>
        <ArrowForwardIosIcon fontSize="small" style={{ color: "blue" }} />
      </IconButton>
    </Box>
  );
};

export default SectionHeader;
