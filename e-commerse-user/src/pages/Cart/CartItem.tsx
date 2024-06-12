import { Box, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { CartContext } from "../../contexts/CartContext";
import { useContext } from "react";

const CartItem = ({ item }: { item: any }) => {
  const { increaseQuantity, decreaseQuantity } = useContext(CartContext)!;
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={2}
      bgcolor="#fff"
      borderRadius={2}
      my={1}
    >
      <Box display="flex" alignItems="center">
        <img
          src={item.image}
          alt={item.name}
          style={{ width: 60, height: 60, borderRadius: 8, marginRight: 16 }}
        />
        <Box>
          <Typography
            variant="body1"
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: { xs: 1, md: 2 },
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {item.name}
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            ${item.price.toFixed(2)}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" alignItems="center">
        <IconButton onClick={() => decreaseQuantity(item._id)} color="primary">
          <RemoveIcon />
        </IconButton>
        <Typography variant="body1" mx={2}>
          {item.cartQuantity}
        </Typography>
        <IconButton onClick={() => increaseQuantity(item._id)} color="primary">
          <AddIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CartItem;
