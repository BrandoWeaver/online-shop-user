import * as React from "react";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import ContactInfo from "./ContactInfo";
import OrderProcess from "./OrderProcess";
import DeliveryAddress from "./addressInfo";
import OrderSummary from "./OrderList";
import FeeBreakdown from "./FreeBreak";
import { Divider } from "@mui/material";
import theme from "../../themes";

const drawerBleeding = 56;

interface Props {
  window?: () => Window;
  orderDetail: Order.IorderDetail | undefined;
}

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

const StyledBox = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled("div")(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

export default function SwipeableEdgeDrawer(props: Props) {
  const { window } = props;
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(70% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />
      <Box sx={{ textAlign: "center", pt: 1 }}>
        <Button onClick={toggleDrawer(true)}>Open</Button>
      </Box>
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
            }}
          >
            <Typography sx={{ color: "text.secondary" }}>
              Order Review
            </Typography>
            <Box
              sx={{
                backgroundColor:
                  props.orderDetail?.status === "cancelled"
                    ? theme.palette.error.light
                    : theme.palette.success.light,
                px: "8px",
                borderRadius: "12px",
              }}
            >
              <Typography
                sx={{
                  color:
                    props.orderDetail?.status === "cancelled"
                      ? theme.palette.error.main
                      : theme.palette.success.main,
                }}
              >
                {props.orderDetail?.status}
              </Typography>
            </Box>
          </Box>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: "100%",
            overflow: "auto",
          }}
        >
          <ContactInfo
            numPhone={props.orderDetail?.phoneNumber}
            buyerName={props.orderDetail?.userName}
          />
          <Divider />
          {props.orderDetail?.status !== "cancelled" && (
            <OrderProcess
              orderStatus={props.orderDetail?.status}
              orderId={props.orderDetail?._id.slice(0, 4)}
            />
          )}

          <Divider />
          <Box py={2}>
            <DeliveryAddress deliverAdd={props.orderDetail?.address} />
          </Box>
          <Divider />
          <Box py={2}>
            <OrderSummary
              totalPrice={props.orderDetail?.totalPrice}
              productList={props.orderDetail?.items}
            />
          </Box>
          <Divider />
          <Box py={2}>
            <FeeBreakdown totalPrice={props.orderDetail?.totalPrice} />
          </Box>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}
