import React, { useContext } from "react";
import {
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
  useTheme,
} from "@mui/material";
import { Add } from "iconsax-react";
import { CartContext } from "../../contexts/CartContext";
import { MdOutlineRemove } from "react-icons/md";
interface IproductCard extends Iproduct.Product {
  width: string;
  height: string;
}
const ProductCard = (props: IproductCard) => {
  const theme = useTheme();
  const { addToCart } = useContext(CartContext)!;
  const { cart, decreaseQuantity } = useContext(CartContext)!;
  console.log("cart", cart);
  const isProductIdIncluded = cart.find(
    (products) => products._id === props._id
  );
  const numOfProduct = cart.find(
    (item) => item._id === props._id
  )?.cartQuantity;
  console.log("isProductIdIncluded", isProductIdIncluded);
  return (
    <Box
      sx={{
        borderRadius: 3,
        // padding: "10px",
        width: props.width,
        // background: theme.palette.background.paper,
      }}
    >
      <Box position="relative">
        <CardMedia
          component="img"
          alt={props.name}
          height={props.height}
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
            // background: theme.palette.background.default,
          }}
        >
          {/* cart[+props._id]?.cartQuantity === 1 */}
          <Box
            sx={{
              display: "flex",
              position: "absolute",
              bottom: 3,
              right: 2,
              alignItems: "center",
              background: theme.palette.background.default,
              borderRadius: 5,
              pr: numOfProduct && numOfProduct > 0 ? 0.5 : 0,
            }}
          >
            <Box
              sx={{
                display: numOfProduct && numOfProduct > 0 ? "flex" : "none",
                alignItems: "center",
                py: 0.5,
                px: 0.5,
                borderRadius: 5,
                background: theme.palette.background.default,
              }}
            >
              <IconButton
                sx={{
                  // position: "absolute",
                  // bottom: 0,
                  // right: 10,
                  background: theme.palette.grey["300"],
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
                <MdOutlineRemove size="19" color={"black"} />
              </IconButton>
              <Typography sx={{ px: 1 }}>
                {cart.find((item) => item._id === props._id)?.cartQuantity || 0}
              </Typography>
            </Box>
            <IconButton
              sx={{
                background: theme.palette.grey["300"],
                borderRadius: "50%",
                py: 0.5,
                px: 0.5,
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
