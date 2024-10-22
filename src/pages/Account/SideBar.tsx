import React, { useContext, useState } from "react";
import {
  Switch,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  Button,
  useTheme,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { Box, Typography, IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LanguageIcon from "@mui/icons-material/Language";
import Brightness2Icon from "@mui/icons-material/Brightness2";
import InfoIcon from "@mui/icons-material/Info";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FacebookIcon from "@mui/icons-material/Facebook";
import TelegramIcon from "@mui/icons-material/Telegram";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../utils/route-util";
import ReusableDrawer from "../../components/Drawer/DrawerCom";
import { useAuthContext } from "../../contexts/AuthContext";
import { ThemeContext } from "../../App";
import { useTranslation } from "react-i18next";
const languages = [
  { code: "kh", name: "ភាសាខ្មែរ", flag: "🇰🇭" },
  { code: "en", name: "English", flag: "🇺🇸" },
];
const Sidebar = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();
  const { authState, setLogInStatus } = useAuthContext();
  // const [language, setLanguage] = useState<string>("en");
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleSelectLanguage = (code: string) => {
  //   setLanguage(code);
  //   handleClose();
  // };
  // const [selectedLanguage, setSelectedLanguage] = useState("en");

  const handleLanguageChange = (code: string) => {
    // setSelectedLanguage(code);
  };

  const { switchColorMode } = useContext(ThemeContext);
  // const activateName = useMemo(
  //   () => (theme.palette.mode === "dark" ? "Light" : "Dark"),
  //   [theme]
  // );
  const { changeLng } = useAuthContext();
  const changeLanguage = (lng: string) => {
    changeLng(lng);
  };

  const handleTelegramClick = () => {
    window.open("https://t.me/BrandoWeaver", "_blank");
  };
  const handleFacebookClick = () => {
    window.open("https://www.facebook.com/BrandoWeaver2002/", "_blank");
  };
  return (
    <Box
      p={3}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box>
        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
          <AccountCircleIcon
            style={{
              fontSize: 60,
              color: "#fff",
              backgroundColor: "#66bb6a",
              borderRadius: "50%",
              padding: 10,
            }}
          />

          <Typography variant="h6" style={{ marginTop: 10 }}>
            {authState?.isLogIn
              ? authState.name
              : `${t("You are not signed In")}`}
          </Typography>
          <Button
            style={{ fontWeight: "bold", marginTop: 5, textTransform: "none" }}
            onClick={() => {
              if (authState?.isLogIn) {
                setLogInStatus(false);
                navigate(ROUTE_PATH.login);
              } else {
                navigate(ROUTE_PATH.login);
              }
            }}
          >
            {authState?.isLogIn ? `${t("Logout")}` : `${t("Sign In")}`}
          </Button>
        </Box>
        <ReusableDrawer
          onClose={handleClose}
          open={open}
          anchor="bottom"
          height={300}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            px={2}
          >
            <Typography variant="h6" fontWeight={"bold"}>
              {t("Select Lanuage")}
            </Typography>
            <Box>
              <IconButton onClick={() => setOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              px: 2,
            }}
          >
            {languages.map((language) => (
              <Paper
                key={language.code}
                onClick={() => {
                  handleLanguageChange(language.code);
                  setOpen(false);
                  changeLanguage(language.code);
                }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  p: 2,
                  mb: 2,
                  cursor: "pointer",
                  border:
                    authState.lan === language.code
                      ? "2px solid #4caf50"
                      : "2px solid transparent",
                  // backgroundColor:
                  //   selectedLanguage === language.code ? "#e8f5e9" : "#fff",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="h4" component="span" sx={{ mr: 2 }}>
                    {language.flag}
                  </Typography>
                  <Typography variant="body1">{language.name}</Typography>
                </Box>
                {authState.lan === language.code && (
                  <CheckCircleIcon sx={{ color: "#4caf50" }} />
                )}
              </Paper>
            ))}
          </Box>
        </ReusableDrawer>

        <List>
          <ListItem button onClick={handleClickOpen}>
            <ListItemIcon>
              <LanguageIcon />
            </ListItemIcon>
            <ListItemText primary={t("Language")} />
            <ArrowForwardIosIcon />
          </ListItem>
          <Divider sx={{ background: theme.palette.grey["50"] }} />
          <ListItem>
            <ListItemIcon>
              <Brightness2Icon />
            </ListItemIcon>
            <ListItemText primary={t("Dark Mode")} />
            <Switch
              edge="end"
              onClick={(e) => {
                e.stopPropagation();
                switchColorMode();
              }}
            />
          </ListItem>
          <Divider sx={{ background: theme.palette.grey["50"] }} />

          <ListItem
            button
            onClick={() => {
              navigate(ROUTE_PATH.about_us);
            }}
          >
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary={t("About Us")} />
            <ArrowForwardIosIcon />
          </ListItem>
          <Divider sx={{ background: theme.palette.grey["50"] }} />

          <ListItem
            button
            onClick={() => {
              navigate(ROUTE_PATH.term);
            }}
          >
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary={t("Term Of Use")} />
            <ArrowForwardIosIcon />
          </ListItem>
          <Divider sx={{ background: theme.palette.grey["50"] }} />
        </List>
      </Box>

      <Box textAlign="center" mb={5}>
        <Typography variant="body1" style={{ fontWeight: "bold" }}>
          {t("FOLLOW US")}
        </Typography>
        <Box display="flex" justifyContent="center" mt={1}>
          <IconButton
            href="#"
            style={{ color: "#3b5998" }}
            onClick={() => handleFacebookClick()}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            href="#"
            style={{ color: "#0088cc" }}
            onClick={() => handleTelegramClick()}
          >
            <TelegramIcon />
          </IconButton>
        </Box>
        <Typography variant="body2" color="textSecondary" mt={2}>
          Address: #S69 & S71, St 1031, Sangkat Khmuonh, Sen Sok, Phnom Penh,
          CAMBODIA.
        </Typography>
      </Box>
    </Box>
  );
};

export default Sidebar;
