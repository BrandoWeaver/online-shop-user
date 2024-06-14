import React from "react";
import {
  Box,
  Paper,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Grid,
} from "@mui/material";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { CartItem } from "../../contexts/CartContext";

interface OrderSummaryProps {
  restaurantName: string;
  items: CartItem[];
  summary: {
    subtotal: number;
    packagingFee: number;
    discount: number;
    deliveryFee: number;
    total: number;
  };
  totoalPrice: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  restaurantName,
  items,
  summary,
  totoalPrice,
}) => {
  return (
    <Box sx={{ p: 2 }}>
      <Paper elevation={0} sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <RemoveShoppingCartIcon color="primary" />
          <Typography variant="h6">Order Summary</Typography>
        </Box>
        <Typography variant="body1" fontWeight={"bold"}>
          {restaurantName}
        </Typography>
        <List>
          {items.map((item, index) => (
            <ListItem key={index} alignItems="flex-start">
              <Grid container alignItems="center">
                <Grid item xs={2}>
                  <Avatar variant="square" src={item.image} alt={item.name} />
                </Grid>
                <Grid item xs={7}>
                  <ListItemText
                    primary={item.name}
                    secondary={`x${item?.cartQuantity}`}
                    sx={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  />
                </Grid>
                <Grid item xs={3} display={"flex"} justifyContent={"flex-end"}>
                  <Typography variant="body2">
                    ${item.price.toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box sx={{ p: 1 }}>
          <Grid container>
            <Grid item xs={8}>
              <Typography variant="body1">Subtotal</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1" align="right">
                ${summary.subtotal.toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={8}>
              <Typography variant="body1">Packaging Fee</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1" align="right">
                ${summary.packagingFee.toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={8}>
              <Typography variant="body1">Discount</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1" align="right" color="blue">
                -${Math.abs(summary.discount).toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={8}>
              <Typography variant="body1">Delivery Fee</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1" align="right">
                ${summary.deliveryFee.toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container>
            <Grid item xs={8}>
              <Typography variant="h6">Total Payable</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6" align="right" color="red">
                ${totoalPrice.toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default OrderSummary;
