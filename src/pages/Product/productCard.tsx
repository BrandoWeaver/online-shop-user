import React, { useContext } from "react";
import {
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { CartContext } from "../../contexts/CartContext";

const ProductCard = (props: Iproduct.Product) => {
  const theme = useTheme();
  const { addToCart } = useContext(CartContext)!;

  return (
    <Box
      sx={{
        borderRadius: 3,
        // padding: "10px",
        width: "190px",
        background: theme.palette.background.paper,
      }}
    >
      <Box position="relative">
        <CardMedia
          component="img"
          alt={props.name}
          height="140"
          image={props.image}
          title={props.name}
          style={{ borderRadius: 10 }}
        />
        <IconButton
          style={{
            position: "absolute",
            bottom: 0,
            right: 10,
            backgroundColor: "white",
            borderRadius: "50%",
            padding: "5px",
          }}
          color="primary"
          aria-label="add to cart"
          onClick={(e) => {
            e.stopPropagation();
            addToCart(props);
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {props.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${props.price.toFixed(2)}
        </Typography>
      </CardContent>
    </Box>
  );
};

export default ProductCard;
