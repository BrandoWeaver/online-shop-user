import React from "react";
import { Drawer, Box, Dialog } from "@mui/material";

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
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
          "& .MuiPaper-root": { borderRadius: 5 },
        }}
      >
        {children}
      </Dialog>

      <Drawer
        anchor={anchor}
        open={open}
        onClose={onClose}
        sx={{ display: { xs: "flex", md: "none" } }}
      >
        <Box
          height={height}
          sx={{
            overflow: "auto",
            pb: 7,
          }}
        >
          {children}
        </Box>
      </Drawer>
    </>
  );
};

export default ReusableDrawer;
