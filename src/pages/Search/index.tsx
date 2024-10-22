import {
  Box,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useContext, useRef, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import { useRequest } from "ahooks";
import { PRODUCT_API } from "../../api/Product";
import ProductCard from "../Product/productCard";
import { LoadingSpiner } from "../../components/Loading";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../utils/route-util";
import { useTranslation } from "react-i18next";
import ErrDialog, { IErrDialogRef } from "../../components/Dialog/ErrorDialog";
import CheckoutButton from "../Cart/CheckoutButton";
import { CartContext } from "../../contexts/CartContext";

// const categories = [
//   "Vegetables",
//   "Fruits",
//   "Meat & Poultry",
//   "Grocery",
//   "Seafood",
//   "Oils",
//   "Hosen",
// ];

function Search() {
  const errRef = useRef<IErrDialogRef>(null);
  const theme = useTheme();
  const navigate = useNavigate();
  const { categories } = useAuthContext();
  const { cart, getTotalPrice, getProductIds } = useContext(CartContext)!;

  const { t } = useTranslation();
  const [searchProduct, setSearchProduct] = useState("");
  const { loading: loadingList, data: allProduct } = useRequest(
    () => PRODUCT_API.listProduct(undefined, searchProduct),
    {
      onSuccess: (data) => {
        console.log("SuccessRes", data);
      },
      onError: (err) => {
        console.log("errRes", err);
        errRef.current?.open("Error Occured");
      },
      ready: searchProduct !== "",
      refreshDeps: [searchProduct],
    }
  );

  return (
    <Box sx={{ background: theme.palette.background.paper }}>
      <ErrDialog ref={errRef} />

      <Box
      // sx={{
      //   background: theme.palette.background.paper,
      //   height: "calc(100vh - 0px)",
      // }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            position: "sticky",
            top: 0,
            zIndex: 1,
            py: 1,
            pr: 2,
            background: theme.palette.background.paper,
          }}
        >
          <IconButton color="primary" onClick={() => window.history.back()}>
            <ArrowBackIcon />
          </IconButton>
          <Paper
            component="form"
            elevation={0}
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: "100%",
              background: theme.palette.grey["100"],
              borderRadius: 27,
            }}
          >
            <IconButton
              sx={{ p: "10px", color: theme.palette.grey["500"] }}
              aria-label="menu"
            >
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{
                ml: 1,
                flex: 1,
                color: theme.palette.grey["900"],
              }}
              placeholder={t("Search")}
              onChange={(e) => setSearchProduct(e.target.value)}
            />
          </Paper>
        </Box>
        {searchProduct === "" ? (
          <>
            <Typography variant="body1" pl={2} fontWeight={"bold"}>
              {t("Popular Categories")}
            </Typography>
            <Grid container spacing={2} mt={1} px={2}>
              {categories.map((category, index) => (
                <Grid item xs={3} sm={4} key={index}>
                  <Paper
                    elevation={0}
                    sx={{
                      padding: "10px",
                      textAlign: "center",
                      borderRadius: "20px",
                      backgroundColor: theme.palette.grey["100"],
                    }}
                    onClick={() => {
                      navigate(
                        ROUTE_PATH.categoryList.replace(":id", category.id)
                      );
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.grey["900"] }}
                    >
                      {category.name}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <>
            {loadingList ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "calc(100vh - 200px)",
                }}
              >
                <LoadingSpiner size={25} />
              </Box>
            ) : (
              <Grid container px={2} spacing={1}>
                {allProduct &&
                  allProduct.products.map((product, index) => (
                    <Grid item xs={6} key={product._id}>
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
                        />
                      </Paper>
                    </Grid>
                  ))}
              </Grid>
            )}
          </>
        )}
      </Box>
      {!loadingList && searchProduct !== "" && cart.length > 0 && (
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
    </Box>
  );
}

export default Search;
