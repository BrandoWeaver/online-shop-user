import React, { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { ROUTE_PATH } from "../../utils/route-util";
import { useRequest } from "ahooks";
import { ORDER_API } from "../../api/Order";
import OrderItem from "./OrderItem";
import { Box, Button, Typography } from "@mui/material";
import { LoadingSpiner } from "../../components/Loading";
import moment from "moment";
import CusDialog, {
  ICusDialogHandler,
} from "../../components/Dialog/CusDialog";

function Order() {
  const { authState } = useAuthContext();
  const [orderId, setOrderId] = useState("");
  const openRef = useRef<ICusDialogHandler>(null);
  const {
    data: listUserOrdered,
    refresh: refreshOrder,
    loading: loadingLiseOrdered,
  } = useRequest(() => ORDER_API.getListUserOrder(`${authState.userId}`), {
    onSuccess: (data) => {
      console.log("dataOrdered", data);
    },
    ready: authState?.userId !== "",
    refreshDeps: [authState?.userId],
  });
  const { run: runCancelOrder, loading: loadingCancelOrder } = useRequest(
    (orderId: string) => ORDER_API.cancelOrder(orderId),
    {
      onSuccess: (data) => {
        console.log("dataOrdered", data);
        refreshOrder();
        openRef.current?.close();
      },
    }
  );
  useEffect(() => {
    if (orderId !== "") {
      openRef.current?.open();
    }
  }, [orderId]);
  // if (!authState?.isLogIn) {
  //   return <Navigate to={ROUTE_PATH.login} replace />;
  // }
  return (
    <div>
      <CusDialog
        maxWidth="lg"
        ref={openRef}
        onCloseDialog={() => setOrderId("")}
      >
        <Box>
          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center", pt: 2, pl: 2 }}
          >
            Confirm Cancel Order
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, pl: 2, mb: 2 }}>
            Are you sure you want to cancel this order?
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", pb: 2, pr: 2 }}>
          <Button
            variant="outlined"
            sx={{ mr: 1, textTransform: "none" }}
            onClick={() => {
              openRef.current?.close();
            }}
          >
            No
          </Button>
          <Button
            variant="contained"
            sx={{ mr: 1, textTransform: "none" }}
            color="primary"
            onClick={() => {
              runCancelOrder(orderId);
            }}
          >
            {loadingCancelOrder ? (
              <LoadingSpiner size={24} color="inherit" />
            ) : (
              "Ok"
            )}
          </Button>
        </Box>
      </CusDialog>
      {loadingLiseOrdered ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 200px)",
          }}
        >
          <LoadingSpiner size={25} />{" "}
        </Box>
      ) : listUserOrdered?.length !== 0 ? (
        listUserOrdered &&
        listUserOrdered.map((i, index) => {
          return (
            <Box key={i._id} sx={{ px: 2, mt: 2, mb: index ? 10 : 0 }}>
              <OrderItem
                key={i._id}
                items={i.items}
                status={i.status}
                notes={i.notes}
                title="Online Shop"
                totalPrice={i.totalPrice}
                createdAt={moment(i.createdAt).format(
                  "MMMM Do YYYY, h:mm:ss a"
                )}
                orderId={i._id}
                setOrderId={setOrderId}
              />
            </Box>
          );
        })
      ) : (
        <Box
          sx={{
            height: "calc(100vh - 200px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography>No Order</Typography>
        </Box>
      )}
    </div>
  );
}

export default Order;
