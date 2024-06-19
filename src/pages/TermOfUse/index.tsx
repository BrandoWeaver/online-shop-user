import React from "react";
import { Typography, Box, IconButton, useTheme } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const TermsOfService = () => {
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
          <Typography variant="h5">Term Of Use</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          overflowY: "scroll",
          p: 2,

          borderRadius: 2,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Terms of Service & Privacy Policy
        </Typography>

        <Typography variant="body1" paragraph>
          Dear Valued Customer,
        </Typography>
        <Typography variant="body1" paragraph>
          We are pleased that you are interested in data protection. We would
          like to give you an easily understandable overview of the data
          processing practices and our privacy compliance measures in relation
          to moreplus.com.kh websites, applications and related services
          (collectively referred to as “platform” below). Our goal is to provide
          you with an amazing product experience while keeping your personal
          data secure. Trust, transparency and honesty are the basic principles.
          You'll enjoy our product in this regard which we can provide you with
          an amazing customer experience.
        </Typography>
        <Typography variant="h5" gutterBottom>
          Who we are:
        </Typography>
        <Typography variant="body1" paragraph>
          We are a professional importing and distributing company that focuses
          on high quality and safety of agricultural products and safe
          foodstuffs which provide people with health, longevity and bright
          future.
        </Typography>
        <Typography variant="h5" gutterBottom>
          What information do we collect?
        </Typography>
        <Typography variant="body1" paragraph>
          We collect information from you when you place an order, subscribe to
          our newsletter, fill out a form, or respond to a survey. As
          appropriate, you may be asked to enter your name, email address,
          mailing address, phone number, or credit card information. You may,
          however, visit our site anonymously.
        </Typography>
        <Typography variant="h5" gutterBottom>
          What do we use your information for?
        </Typography>
        <Typography variant="body1" paragraph>
          Any of the information we collect from you may be used to improve
          customer service, to process transactions and to administer a contest,
          promotion, survey or other site feature. Your information, whether
          public or private, will not be sold, exchanged, transferred, or given
          to any other company for any reason whatsoever, without your consent,
          other than for the express purpose of delivering the purchased item or
          service requested.
        </Typography>
        <Typography variant="h5" gutterBottom>
          How do we protect your information?
        </Typography>
        <Typography variant="body1" paragraph>
          We implement a variety of security measures to maintain the safety of
          your personal information when you place an order or enter, submit, or
          access your personal information. Our site is hosted on a secure HTTPS
          with SSL certificate for data encryption.
        </Typography>
        <Typography variant="h5" gutterBottom>
          Do we use cookies?
        </Typography>
        <Typography variant="body1" paragraph>
          Yes. Cookies are small files that a site or its service provider
          transfers to your computer’s hard drive through your web browser (if
          you allow) that enables the site’s or service provider’s system to
          recognize your browser and capture and remember certain information.
          We use cookies to help us remember and process the items in your
          shopping cart and understand and save your preferences for future
          visits.
        </Typography>
        <Typography variant="h5" gutterBottom>
          Do we disclose any information to outside parties?
        </Typography>
        <Typography variant="body1" paragraph>
          We do not sell, trade, or otherwise transfer to outside parties your
          personally identifiable information. This does not include trusted
          third parties who assist us in operating our website, conducting our
          business, or servicing you, so long as those parties agree to keep
          this information confidential. We may also release your information
          when we believe release is appropriate to comply with the law, enforce
          our site policies, or protect ours or others’ rights, property, or
          safety. However, non-personally identifiable visitor information may
          be provided to other parties for marketing, advertising, or other
          uses.
        </Typography>
        <Typography variant="h5" gutterBottom>
          Your data deletion request:
        </Typography>
        <Typography variant="body1" paragraph>
          You may ask us to delete or remove your Account/Data and stop using
          the platform by emailing info@onlinshop.com.kh. Please provide us your
          complete name, bank account or card from your account before emailing
          the account deletion request to us.
        </Typography>
        <Typography variant="h5" gutterBottom>
          Changes to our Privacy Policy:
        </Typography>
        <Typography variant="body1" paragraph>
          If we decide to change our privacy policy, we will post those changes
          on this page. This policy was last modified on May 11, 2024.
        </Typography>
        <Typography variant="h5" gutterBottom>
          Contacting Us:
        </Typography>
        <Typography variant="body1" paragraph>
          If there are any questions regarding this privacy policy, you may
          contact us using the information below.
        </Typography>
        <Typography variant="body1" paragraph>
          Online Shop! Online Ordering and Delivery Service Phnom Penh, Cambodia
          Tel: 012 738 526 Email: info@onlinshop.com.kh | www.moreplus.com.kh
        </Typography>
      </Box>
    </Box>
  );
};

export default TermsOfService;
