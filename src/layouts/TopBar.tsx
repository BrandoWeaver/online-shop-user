import * as React from "react";
import Box from "@mui/material/Box";
import Header from "./Header";
import PWAInstallHeader from "../components/SWP/PWAInstallHeader";
export default function PrimarySearchAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* <AppBar> */}
      {/* <Toolbar sx={{ display: "flex", justifyContent: "end" }}> */}
      {/* <ChnageLanguage /> */}
      <PWAInstallHeader />
      <Header />
      {/* </Toolbar> */}
      {/* </AppBar> */}
    </Box>
  );
}
