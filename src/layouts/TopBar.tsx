import * as React from "react";
import Box from "@mui/material/Box";
import Header from "./Header";
// import PWAInstallHeader from "../components/SWP/PWAInstallHeader";
export default function PrimarySearchAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* <PWAInstallHeader /> */}
      <Header />
    </Box>
  );
}
