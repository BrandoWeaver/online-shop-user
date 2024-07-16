import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
  // useTheme,
} from "@mui/material";
// import { BsFillBellFill } from "react-icons/bs";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import React, { useEffect, useState } from "react";

import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../utils/route-util";
import { useTranslation } from "react-i18next";
export const BottomList = [
  {
    id: 0,
    label: "Products",
    icon: <StorefrontRoundedIcon />,
    route: ROUTE_PATH.product,
  },
  {
    id: 1,
    label: "Order",
    icon: <LocalMallIcon />,
    route: ROUTE_PATH.order,
  },
  {
    id: 2,
    label: "Cart",
    icon: <ShoppingCartIcon />,
    route: ROUTE_PATH.cart,
  },
  {
    id: 3,
    label: "Inbox",
    icon: <NotificationsIcon />,
    route: ROUTE_PATH.inbox,
  },
  {
    id: 4,
    label: "Profile",
    icon: <AccountCircleIcon />,
    route: ROUTE_PATH.account,
  },
];
export default function BottomBar() {
  // const theme = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const location = useLocation();
  useEffect(() => {
    const currentPath = location.pathname;
    const matchedIndex = BottomList.findIndex((i) =>
      matchPath(i.route, currentPath)
    );
    if (matchedIndex !== -1) {
      setValue(matchedIndex);
    }
  }, [location.pathname]);
  return (
    <Box
      sx={{
        display: {
          xs: "flex",
          md: "none",
        },
      }}
    >
      <Paper
        sx={{
          position: "fixed",

          bottom: 0,
          left: 0,
          right: 0,

          zIndex: 200000,
        }}
        elevation={9}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            navigate(BottomList[newValue].route);
          }}
          sx={{ minWidth: 0, p: 0 }}
        >
          {BottomList.map((i, index) => {
            return (
              <BottomNavigationAction
                key={i.label}
                label={t(i.label)}
                icon={i.icon}
                sx={{
                  minWidth: 0,
                  p: 0,
                  color: value === index ? "primary.main" : "text.secondary",
                }}
              />
            );
          })}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
