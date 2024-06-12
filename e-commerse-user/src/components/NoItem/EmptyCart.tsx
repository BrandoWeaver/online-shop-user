import React from "react";
import { Container, Box, Typography } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

const EmptyCart = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 4, textAlign: "center" }}>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <ShoppingBagOutlinedIcon sx={{ fontSize: 100, color: "grey.500" }} />
        <Typography variant="h6" sx={{ mt: 2, color: "grey.600" }}>
          There is no item in cart yet.
        </Typography>
      </Box>
    </Container>
  );
};

export default EmptyCart;
