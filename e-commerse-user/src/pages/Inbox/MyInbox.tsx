import React, { useState } from "react";
import { Box, Tabs, Tab, Typography, Grid, useTheme } from "@mui/material";
import NotificationCard from "./PromotionCart";
import MessagePreview from "./MessagePreview";
import { LoadingSpiner } from "../../components/Loading";
import ErrorResponse from "../../components/ErrorResponse";
import { useAuthContext } from "../../contexts/AuthContext";
import moment from "moment";

// Interface for Tab Label
// interface TabLabel {
//   label: string;
// }

interface Iinbox {
  dataNotification: Imessage.Notification[] | undefined;
  dataListProductPromotion:
    | IlistproductPromotion.PromotionProduct[]
    | undefined;
  loadingNotification: boolean;
  loadingProductPromtionList: boolean;
  errorNotification: Error | undefined;
  errorProductPromotion: Error | undefined;
  refreshNotification: () => void;
  refreshProductPromotion: () => void;
}
const InboxTabs = (props: Iinbox) => {
  const { authState } = useAuthContext();
  const [value, setValue] = useState<number>(0); // Initial state with type
  const theme = useTheme();
  const handleChange = (
    event: React.SyntheticEvent<unknown>,
    newValue: number
  ) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box
        sx={{
          position: "sticky",
          top: 55,
          px: 2,
          background: theme.palette.background.paper,
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Promotions" />
            <Tab label="Notifications" />
          </Tabs>
        </Box>
      </Box>

      <Box pt={2} mb={10}>
        {value === 0 && (
          <>
            <Grid container spacing={1} px={2}>
              {props.loadingProductPromtionList ? (
                <Grid item xs={12}>
                  <Box
                    sx={{
                      height: "calc(100vh - 250px)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <LoadingSpiner size={25} />
                    </Box>
                  </Box>
                </Grid>
              ) : props.errorProductPromotion ? (
                <Grid
                  item
                  xs={12}
                  sx={{
                    height: "calc(100vh - 250px)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ErrorResponse
                    message={"Error Occurred"}
                    buttonText="Refresh"
                    buttonAction={props.refreshProductPromotion}
                  />
                </Grid>
              ) : props.dataListProductPromotion &&
                props.dataListProductPromotion.length > 0 ? (
                props.dataListProductPromotion.map((card, index) => (
                  <Grid item xs={6} sm={6} md={4} key={index}>
                    <NotificationCard
                      image={card.product.image}
                      title={card.product.name}
                      price={card.product.price.toString()}
                    />
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Box
                    sx={{
                      height: "calc(100vh - 290px)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography>No Data</Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          </>
        )}

        {value === 1 && (
          <>
            {props.loadingNotification ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    height: "calc(100vh - 250px)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <LoadingSpiner size={25} />
                </Box>
              </Box>
            ) : props.errorNotification ? (
              <Box
                sx={{
                  height: "calc(100vh - 250px)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ErrorResponse
                  message={"Error Occurred"}
                  buttonText="Refresh"
                  buttonAction={props.refreshNotification}
                />
              </Box>
            ) : props.dataNotification && props.dataNotification.length > 0 ? (
              props.dataNotification.map((i) => (
                <Box key={i._id}>
                  <MessagePreview
                    status={i.read}
                    ownerName={authState?.name || ""}
                    messageBody={i.message}
                    date={moment(i.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                    image={
                      "https://thumbs.dreamstime.com/b/sms-icon-vector-simple-illustration-sms-icon-isolated-white-background-sms-icon-vector-simple-101969076.jpg"
                    }
                  />
                </Box>
              ))
            ) : (
              <Box
                sx={{
                  height: "calc(100vh - 290px)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography>No Data</Typography>
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default InboxTabs;
