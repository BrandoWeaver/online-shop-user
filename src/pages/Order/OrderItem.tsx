import React from "react";
import {
  Box,
  Button,
  Typography,
  Avatar,
  Badge,
  Paper,
  Divider,
} from "@mui/material";
import { styled } from "@mui/system";
import { ROUTE_PATH } from "../../utils/route-util";
import { useNavigate } from "react-router-dom";
import theme from "../../themes";
export interface OrderItemProps {
  notes: string;
  status: string;
  items: Item[];
  totalPrice: number;
  createdAt: string;
  title: string;
  setOrderId: React.Dispatch<React.SetStateAction<string>>;
  orderId: string;
}
export interface Item {
  product: Product;
  quantity: number;
  _id: string;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -10,
    top: -10,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const OrderItem: React.FC<OrderItemProps> = ({
  notes,
  status,
  items,
  totalPrice,
  createdAt,
  title,
  setOrderId,
  orderId,
}) => {
  const navigate = useNavigate();
  return (
    <Paper elevation={3} sx={{ borderRadius: 2, p: 2, mb: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={`${process.env.REACT_APP_PUBLIC_URL}assets/images/logo.png`}
            sx={{ mr: 2, width: 48, height: 48 }}
          />
          <Box>
            <Typography variant="body1" sx={{ fontWeight: "bold" }} noWrap>
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {createdAt}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor:
              status === "cancelled"
                ? theme.palette.error.light
                : theme.palette.success.light,
            px: "8px",
            borderRadius: "12px",
          }}
        >
          <Typography
            sx={{
              color:
                status === "cancelled"
                  ? theme.palette.error.main
                  : theme.palette.success.main,
            }}
          >
            {status}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", mt: 2, overflowX: "auto" }}>
        {items &&
          items.map((item, index) => (
            <Box
              key={index}
              sx={{ position: "relative", display: "inline-flex", mr: 1 }}
            >
              <StyledBadge badgeContent={`x${item.quantity}`} color="primary">
                <Avatar
                  src={item.product?.image || ""}
                  variant="rounded"
                  sx={{ width: 70, height: 70 }}
                />
              </StyledBadge>
              <Box
                sx={{
                  position: "absolute",
                  bottom: 2,
                  right: 2,
                  background: theme.palette.background.default,
                  borderRadius: 1,
                  px: 0.5,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography>X{item.quantity}</Typography>
              </Box>
            </Box>
          ))}
      </Box>
      <Divider sx={{ mt: 2 }} />
      <Typography>Note: {notes}</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Total Payment{" "}
          <span style={{ color: "#ff0000" }}>${totalPrice.toFixed(2)}</span>
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        {status === "pending" && (
          <Button
            variant="outlined"
            sx={{ mr: 1, textTransform: "none" }}
            color="error"
            onClick={() => {
              setOrderId(orderId);
            }}
          >
            Cancel Order
          </Button>
        )}
        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: "none" }}
          onClick={() => {
            navigate(ROUTE_PATH.orderDetail + `?orderId=${orderId}`);
            console.log("exist", items);
          }}
        >
          Review Order
        </Button>
      </Box>
    </Paper>
  );
};

export default OrderItem;
