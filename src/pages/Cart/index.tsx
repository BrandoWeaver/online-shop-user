import { Box, Button, Typography } from "@mui/material";
import { useContext, useRef } from "react";
import CartItem from "./CartItem";
import CheckoutButton from "./CheckoutButton";
import EmptyCart from "../../components/NoItem/EmptyCart";
import { CartContext } from "../../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../utils/route-util";
import CusDialog, {
  ICusDialogHandler,
} from "../../components/Dialog/CusDialog";

function Cart() {
  const { cart, getTotalPrice, getProductIds, clearCart } =
    useContext(CartContext)!;
  const navigate = useNavigate();
  const openRef = useRef<ICusDialogHandler>(null);
  return (
    <Box sx={{ px: 2, overflow: "scroll", pb: 2 }}>
      <CusDialog maxWidth="lg" ref={openRef}>
        <Box>
          <Typography sx={{ mt: 2, ml: 2, mb: 2 }}>
            Are you sure you want to clear your cart?
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", pr: 2, pb: 2 }}>
          <Button color="error" onClick={() => openRef.current?.close()}>
            No
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              clearCart();
              openRef.current?.close();
            }}
          >
            Ok
          </Button>
        </Box>
      </CusDialog>
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        padding={2}
      >
        <Button
          color="error"
          onClick={() => openRef.current?.open()}
          disabled={getTotalPrice() <= 0}
        >
          Clear
        </Button>
      </Box>
      {cart.length > 0 ? (
        <Box sx={{ height: "calc(100vh - 290px)", overflow: "scroll" }}>
          {cart.map((item, index) => (
            <CartItem key={index} item={item} />
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            height: "calc(100vh - 300px)",
            display: "flex",
            alignItems: "center",
          }}
        >
          <EmptyCart />
        </Box>
      )}

      <CheckoutButton
        count={getProductIds().length || 0}
        total={getTotalPrice()}
        handleOnClick={() => {
          navigate(ROUTE_PATH.checkout);
        }}
      />
    </Box>
  );
}

export default Cart;
