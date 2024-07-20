import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const PWAInstallHeader = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [isPromptVisible, setIsPromptVisible] = useState(false);
  const [isPWAInstallSupported, setIsPWAInstallSupported] = useState(false);

  useEffect(() => {
    if ("BeforeInstallPromptEvent" in window) {
      setIsPWAInstallSupported(true);

      const handler = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e);
        setIsPromptVisible(true);
      };

      window.addEventListener("beforeinstallprompt", handler);

      return () => {
        window.removeEventListener("beforeinstallprompt", handler);
      };
    } else {
      setIsPWAInstallSupported(false);
    }
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      (deferredPrompt as any).prompt();
      (deferredPrompt as any).userChoice.then(
        (choiceResult: { outcome: string }) => {
          if (choiceResult.outcome === "accepted") {
            console.log("User accepted the install prompt");
          } else {
            console.log("User dismissed the install prompt");
          }
          setDeferredPrompt(null);
          setIsPromptVisible(false);
        }
      );
    }
  };

  const Onclose = () => {
    setIsPromptVisible(false);
  };

  return (
    <AppBar
      position="static"
      color="default"
      sx={{
        display: isPromptVisible || !isPWAInstallSupported ? "block" : "none",
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="close"
          onClick={() => {
            Onclose();
          }}
        >
          <CloseIcon />
        </IconButton>
        <Avatar
          src={`${process.env.REACT_APP_PUBLIC_URL}assets/images/logo.png`}
          alt="Online Shop"
          sx={{ marginRight: 2 }}
        />
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" noWrap>
              Online Shop
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" noWrap>
              Daily Shop App
            </Typography>
          </Box>
          <Box>
            {isPWAInstallSupported ? (
              isPromptVisible ? (
                <Button
                  variant="contained"
                  sx={{ textTransform: "none" }}
                  color="primary"
                  onClick={handleInstallClick}
                >
                  Install App
                </Button>
              ) : (
                <Typography variant="body1" color="textSecondary">
                  Add this app to your home screen for a better experience.
                </Typography>
              )
            ) : (
              <Button
                variant="contained"
                sx={{ textTransform: "none" }}
                color="primary"
                onClick={handleInstallClick}
              >
                Install App
              </Button>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default PWAInstallHeader;
