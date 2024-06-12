import { memo } from "react";
// import { useTranslation } from "react-i18next";
import { matchPath, useLocation, useNavigate } from "react-router";

import {
  // AppBar,
  // Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  // Toolbar,
  // Typography,
  // useTheme,
} from "@mui/material";
import { IoChatboxEllipses } from "react-icons/io5";

import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import { IoHome } from "react-icons/io5";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { ROUTE_PATH } from "../utils/route-util";
import { useTranslation } from "react-i18next";
interface Props {
  drawerWidth?: number;
  setOpenDrawer?: React.Dispatch<React.SetStateAction<boolean>>;
}
const menuItems = [
  {
    subMenu: [
      {
        title: "Products",
        icon: <StorefrontRoundedIcon />,
        path: ROUTE_PATH.product,
      },
      {
        title: "Cart",
        icon: <ShoppingCartIcon />,
        path: ROUTE_PATH.cart,
      },
      {
        title: "Notification",
        icon: <NotificationsIcon />,
        path: ROUTE_PATH.inbox,
      },

      {
        title: "Account",
        icon: <AccountCircleIcon />,
        path: ROUTE_PATH.account,
      },
    ],
  },
];
export const DrawerApp = (props: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  // const theme = useTheme();
  const { pathname } = useLocation();
  return (
    <>
      <Stack
        height={["auto", "auto", "100%"]}
        sx={{
          pt: 10,
          px: { xs: 2, md: 2 },
          display: { xs: "none", md: "flex" },
        }}
        width={props.drawerWidth}
      >
        <Stack direction={["column"]} height="inherit">
          {menuItems.map((menu, i) => {
            return (
              <Box sx={{ pb: 3 }} key={i}>
                {menu.subMenu && (
                  <List
                    key={i}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      pt: 0,
                    }}
                  >
                    {menu.subMenu.map((menuSub, subIndex) => {
                      const basePath = pathname.replace(/\/\d+$/, "");
                      const submatch = Boolean(
                        menuSub.path && matchPath(menuSub.path, basePath)
                      );
                      return (
                        <ListItem
                          disablePadding
                          key={menuSub.title}
                          sx={{
                            // color: !submatch
                            //   ? 'text.secondary'
                            //   : 'background.paper',
                            height: "48px",
                            borderRadius: "8px",
                            bgcolor: !submatch
                              ? "primary.paper"
                              : "primary.main",
                            ":hover": {
                              bgcolor: !submatch
                                ? "primary.paper"
                                : "primary.main",
                            },
                            mb: 0,
                            pt: 0,
                          }}
                          onClick={() => {
                            navigate(menuSub.path);
                            props.setOpenDrawer &&
                              props.setOpenDrawer((pre) => !pre);
                          }}
                        >
                          <ListItemButton
                            sx={{ borderRadius: "8px", height: "48px" }}
                          >
                            <ListItemIcon
                              sx={{
                                color: !submatch
                                  ? "text.secondary"
                                  : "background.paper",
                                ml: "2px",
                                minWidth: "45px",
                              }}
                            >
                              {menuSub.icon}
                            </ListItemIcon>
                            <ListItemText
                              primary={t(`${menuSub.title}`)}
                              sx={{
                                color: !submatch
                                  ? "text.secondary"
                                  : "background.paper",
                                // color: theme.palette.grey['100'],
                                // bgcolor: !submatch
                                //   ? 'primary.paper'
                                //   : 'primary.main',
                                // ':hover': {
                                //   bgcolor: !submatch
                                //     ? 'primary.paper'
                                //     : 'primary.main',
                                // },
                                mb: 0,
                                pt: 0,
                                mt: 0,
                              }}
                            />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                )}
              </Box>
            );
          })}
        </Stack>
      </Stack>
    </>
  );
};

export default memo(DrawerApp);
