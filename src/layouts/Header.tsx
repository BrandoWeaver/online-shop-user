import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  IconButton,
  useTheme,
  Avatar,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../utils/route-util";

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: theme.palette.background.paper,
        boxShadow: "none",
        // borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item>
            <Avatar
              sx={{ width: 50, height: 50 }}
              variant="square"
              src={`${process.env.REACT_APP_PUBLIC_URL}assets/images/logo.png`}
            />
          </Grid>
          <Grid item xs>
            <Grid container alignItems="center" justifyContent="center">
              <LocationOnIcon color="primary" />
              <Typography
                variant="body1"
                color="textPrimary"
                style={{ marginLeft: 8 }}
              >
                <span style={{ color: "gray" }}>DELIVER TO...</span> <br />
                <strong>Current Location</strong>
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <IconButton
              onClick={() => {
                navigate(ROUTE_PATH.search);
              }}
            >
              <SearchIcon />
            </IconButton>
            {/* <IconButton>
              <FavoriteBorderIcon />
            </IconButton> */}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
