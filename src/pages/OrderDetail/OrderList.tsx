import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
interface Props {
  totalPrice: number | undefined;
  productList: Order.Item[] | undefined;
}
const OrderSummary = (props: Props) => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="body1" fontWeight={"bold"}>
          Total (incl. VAT)
        </Typography>
        <Typography variant="body1" fontWeight={"bold"}>
          ${props.totalPrice && props.totalPrice.toFixed(2)}
        </Typography>
      </Box>
      <Stack direction="row" alignItems="center" spacing={1}>
        <AttachMoneyIcon />
        <Typography variant="body1" fontWeight={"bold"}>
          Cash on delivery
        </Typography>
      </Stack>
      <Box mt={2}>
        {props.productList &&
          props.productList.map((item, index) => (
            <Stack key={index} direction="row" alignItems="center" spacing={2}>
              <Box
                component="img"
                src={item.product.image}
                alt={item.product.name}
                width={50}
                height={50}
              />
              <Typography
                variant="body1"
                sx={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.product.name} - {item.quantity}KG
              </Typography>
              <Typography variant="body1">
                ${item.product.price.toFixed(2)}
              </Typography>
            </Stack>
          ))}
      </Box>
    </Box>
  );
};

export default OrderSummary;
