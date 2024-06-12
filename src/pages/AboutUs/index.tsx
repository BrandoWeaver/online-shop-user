import React from "react";
import {
  Box,
  Typography,
  Link,
  Grid,
  IconButton,
  Avatar,
  useTheme,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import LanguageIcon from "@mui/icons-material/Language";
import FacebookIcon from "@mui/icons-material/Facebook";
import TelegramIcon from "@mui/icons-material/Telegram";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const AboutUs = () => {
  const theme = useTheme();
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          position: "sticky",
          top: 0,
          background: theme.palette.background.paper,
          width: "100%",
          py: 1,
        }}
      >
        <IconButton color="primary" onClick={() => window.history.back()}>
          <ArrowBackIcon />
        </IconButton>
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <Typography variant="h5">About Us</Typography>
        </Box>
      </Box>
      <Box bgcolor="#fff" p={2} borderRadius={2} boxShadow={1} mb={3}>
        <Typography variant="h6" color="primary" gutterBottom>
          About More Plus
        </Typography>
        <Typography variant="body1" paragraph>
          More Plus was established in July 22, 2023 by four founders who came
          together with a vision to provide the best quality of agricultural
          products and safe foodstuffs to everyone in Cambodia. The first outlet
          of More Plus opened on street 1031 in Banlasaeth village, Sangkat
          Khmuonh, Khan Sensok, Phnom Penh and was called More Plus.
        </Typography>
        <Typography variant="body1" paragraph>
          More Plus is a retail, wholesale and distributor of agricultural
          products and safety foodstuff standards that provide all people with
          good health, longevity and a prosperous future. Our market is fast
          gaining popularity because of providing our customers with high
          quality fresh food and a wide range of safety standard products. Thank
          you for ordering directly from our website, which encourages us to
          continue our efforts to provide the best service with a focus on safe
          and high quality food. Enjoy your next meal - you will not be
          disappointed!
        </Typography>
      </Box>

      <Box bgcolor="#fff" p={2} borderRadius={2} boxShadow={1} mb={3}>
        <Typography variant="h6" color="primary" gutterBottom>
          Contact Us
        </Typography>
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            <PhoneIcon />
          </Grid>
          <Grid item>
            <Typography variant="body1">Customer Support: 085679999</Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="center" spacing={1} mt={1}>
          <Grid item>
            <LanguageIcon />
          </Grid>
          <Grid item>
            <Link
              href="http://moreplus.com.kh"
              target="_blank"
              rel="noopener"
              color="inherit"
            >
              moreplus.com.kh
            </Link>
          </Grid>
        </Grid>
      </Box>

      <Box bgcolor="#fff" p={2} borderRadius={2} boxShadow={1} mb={3}>
        <Typography variant="h6" color="primary" gutterBottom>
          Location
        </Typography>
        <Avatar src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.555864194936!2d104.88699301536606!3d11.556442047529583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109515b775ae9ff%3A0xa476dfc21f0b0dd0!2sCenter%20for%20Banking%20Studies!5e0!3m2!1sen!2skh!4v1622020190985!5m2!1sen!2skh" />
      </Box>

      <Box bgcolor="#fff" p={2} borderRadius={2} boxShadow={1} mb={3}>
        <Typography variant="h6" color="primary" gutterBottom>
          Follow Us
        </Typography>
        <Box display="flex" justifyContent="flex-start">
          <IconButton
            href="https://www.facebook.com"
            target="_blank"
            color="primary"
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            href="https://telegram.org"
            target="_blank"
            color="primary"
          >
            <TelegramIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};
export default AboutUs;
