import { Outlet } from "react-router-dom";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

// import { useAuthContext } from "../contexts/AuthContext";
// import { ROUTE_PATH } from "../utils/route-util";
import Menubar from "./Menubar";
import Navbar from "./Navbar";
import BottomBar from "./BottomBar";
import { useTheme } from "@mui/material";
import PWAInstallHeader from "../components/SWP/PWAInstallHeader";

const drawerWidth = 300;
function Layout() {
  // const { authState } = useAuthContext();
  // if (!authState?.isLogIn) {
  //   return <Navigate to={ROUTE_PATH.login} replace />;
  // }
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", background: theme.palette.background.paper }}>
      <Navbar />
      <Menubar {...{ drawerWidth }} />
      <BottomBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100%",
          background: theme.palette.background.paper,
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;
