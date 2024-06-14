import React, { useContext } from "react";
import {
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
  useTheme,
  Button,
} from "@mui/material";
import { Add } from "iconsax-react";
import AddIcon from "@mui/icons-material/Add";
import { CartContext } from "../../contexts/CartContext";
import { LuTrash } from "react-icons/lu";
import { MdOutlineRemove } from "react-icons/md";
const ProductCard = (props: Iproduct.Product) => {
  const theme = useTheme();
  const { addToCart } = useContext(CartContext)!;
  const { cart, increaseQuantity, decreaseQuantity, clearCart } =
    useContext(CartContext)!;
  console.log("cart", cart);
  const isProductIdIncluded = cart.find(
    (products) => products._id === props._id
  );
  console.log("isProductIdIncluded", isProductIdIncluded);
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
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            bottom: 0,
            right: 10,
            background: theme.palette.background.default,
          }}
        >
          {/* cart[+props._id]?.cartQuantity === 1 */}
          <Box
            sx={{
              display: "flex",
              position: "absolute",
              bottom: 0,
              right: 2,
              alignItems: "center",
            }}
          >
            <>
              <IconButton
                style={{
                  // position: "absolute",
                  // bottom: 0,
                  // right: 10,
                  backgroundColor: "white",
                  // borderRadius: "50%",
                  // padding: "5px",
                }}
                color="primary"
                aria-label="add to cart"
                onClick={(e) => {
                  e.stopPropagation();
                  decreaseQuantity(props._id);
                }}
              >
                <MdOutlineRemove size="18" color={"black"} />
              </IconButton>
              <Typography>
                {cart.find((item) => item._id === props._id)?.cartQuantity || 0}
              </Typography>
            </>

            <IconButton
              style={{
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
              <Add size="24" color={"black"} />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <CardContent>
        <Typography
          gutterBottom
          // variant="h6"
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
