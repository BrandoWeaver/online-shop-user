import React from "react";
import { Drawer, Box } from "@mui/material";

interface ReusableDrawerProps {
  anchor: "top" | "bottom" | "left" | "right";
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  height: number;
}

const ReusableDrawer: React.FC<ReusableDrawerProps> = ({
  anchor,
  open,
  onClose,
  children,
  height,
}) => {
  return (
    <Drawer anchor={anchor} open={open} onClose={onClose}>
      <Box height={height} sx={{ overflow: "scroll", pb: 7 }}>
        {children}
      </Box>
    </Drawer>
  );
};

export default ReusableDrawer;
