import { memo, useState } from "react";

import { AppBar, Drawer, Toolbar } from "@mui/material";
import { Box } from "@mui/material";
import { DrawerApp } from "./Menubar";
import PrimarySearchAppBar from "./TopBar";

function Navbar() {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: "background.paper",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          // px: { md: 5, xs: 1 },
        }}
      >
        <PrimarySearchAppBar />
      </Toolbar>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <DrawerApp drawerWidth={280} setOpenDrawer={setOpenDrawer} />
        </Box>
      </Drawer>
    </AppBar>
  );
}

export default memo(Navbar);
