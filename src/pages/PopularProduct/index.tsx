import { useContext, useRef, useState } from "react";
import {
  Toolbar,
  IconButton,
  Typography,
  useTheme,
  Grid,
  Box,
  Paper,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import { ROUTE_PATH } from "../../utils/route-util";
import { useNavigate } from "react-router-dom";

import { useRequest } from "ahooks";
import { PRODUCT_API } from "../../api/Product";
import ProductCard from "../Product/productCard";
import { LoadingSpiner } from "../../components/Loading";
import ErrorResponse from "../../components/ErrorResponse";
import ProductDrawer from "../Product/ProductDrawer";
import CheckoutButton from "../Cart/CheckoutButton";
import { CartContext } from "../../contexts/CartContext";
import { useTranslation } from "react-i18next";
import ErrDialog, { IErrDialogRef } from "../../components/Dialog/ErrorDialog";

function PopularProduct() {
  const navigate = useNavigate();
  const errRef = useRef<IErrDialogRef>(null);
  const { cart, getTotalPrice, getProductIds } = useContext(CartContext)!;
  const theme = useTheme();
  const { t } = useTranslation();
  const [produtDetail, setProdudctDetail] = useState<Iproduct.Product>();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {
    data: allProduct,
    loading: loadingProduct,
    error: errorProduct,
    refresh: handleRefresh,
  } = useRequest(() => PRODUCT_API.pupularProduct(2), {
    onSuccess: (data) => {
      console.log("SuccessRes", data);
    },
    onError: (err) => {
      console.log("errRes", err);
      errRef.current?.open("Error Occured");
    },
  });

  return (
    <div>
      <ErrDialog ref={errRef} />
      <Toolbar
        sx={{
          position: "sticky",
          top: 0,
          zIndex: "1000",
          background: theme.palette.background.default,
        }}
      >
        <IconButton
          edge="start"
          color="default"
          aria-label="back"
          onClick={() => {
            navigate(ROUTE_PATH.product);
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography
          variant="h6"
          style={{ flexGrow: 1, textAlign: "center" }}
          color={theme.palette.grey["700"]}
        >
          {t("Popular Products")}
        </Typography>
        <IconButton
          edge="end"
          color="default"
          aria-label="search"
          onClick={() => {
            navigate(ROUTE_PATH.search);
          }}
        >
          <SearchIcon />
        </IconButton>
      </Toolbar>
      <Grid container spacing={1} sx={{ px: 2, marginTop: 2 }}>
        {loadingProduct ? (
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "calc(100vh - 250px)",
            }}
          >
            <LoadingSpiner size={25} />
          </Grid>
        ) : (
          <>
            {allProduct &&
              allProduct.products?.map((product, index) => (
                <Grid
                  item
                  xs={6}
                  md={2}
                  key={product._id}
                  onClick={() => {
                    setProdudctDetail(product);
                    setDrawerOpen(true);
                  }}
                >
                  <Paper elevation={3} sx={{ borderRadius: 2 }}>
                    <ProductCard
                      image={product.image}
                      price={product.price}
                      name={product.name}
                      _id={product._id}
                      description={product.description}
                      cate_id={product.cate_id}
                      quantity={product.quantity}
                      status={product.status}
                      createdAt={product.createdAt}
                      updatedAt={product.updatedAt}
                      __v={product.__v}
                      width="auto"
                      height="170"
                    />
                  </Paper>
                </Grid>
              ))}
            {errorProduct && (
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "calc(100vh - 250px)",
                }}
              >
                <ErrorResponse
                  message={"Error Occurred"}
                  buttonText="Refresh"
                  buttonAction={handleRefresh}
                />
              </Grid>
            )}
          </>
        )}
      </Grid>
      {cart.length > 0 && (
        <Box position={"fixed"} bottom={7} width={"100%"} px={2}>
          <CheckoutButton
            count={getProductIds().length || 0}
            total={getTotalPrice()}
            handleOnClick={() => {
              navigate(ROUTE_PATH.cart);
            }}
          />
        </Box>
      )}
      <ProductDrawer
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        productDetail={produtDetail}
      />
    </div>
  );
}

export default PopularProduct;
