// src/components/PWAInstallHeader.tsx
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import usePWAInstallPrompt from "../../hooks/usePWAInstallPrompt";

const PWAInstallHeader = () => {
  const { isPromptVisible, handleInstallClick } = usePWAInstallPrompt();

  return (
    <AppBar
      position="static"
      color="default"
      sx={{ display: isPromptVisible ? "block" : "none" }}
    >
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="close">
          <CloseIcon />
        </IconButton>
        <Avatar
          src={`${process.env.REACT_APP_PUBLIC_URL}assets/images/logo.png`}
          alt="Online Shop"
          sx={{ marginRight: 2 }}
        />
        <div style={{ flexGrow: 1 }}>
          <Typography variant="h6" noWrap>
            Online Shop
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" noWrap>
            Your Daily Shop App
          </Typography>
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleInstallClick}
        >
          Install App
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default PWAInstallHeader;
