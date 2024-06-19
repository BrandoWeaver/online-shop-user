import {
  Box,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import { useRequest } from "ahooks";
import { PRODUCT_API } from "../../api/Product";
import ProductCard from "../Product/productCard";
import { LoadingSpiner } from "../../components/Loading";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../utils/route-util";

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
  const theme = useTheme();
  const navigate = useNavigate();
  const { categories } = useAuthContext();
  const [searchProduct, setSearchProduct] = useState("");
  const { loading: loadingList, data: allProduct } = useRequest(
    () => PRODUCT_API.listProduct(undefined, searchProduct),
    {
      onSuccess: (data) => {
        console.log("SuccessRes", data);
      },
      onError: (err) => {
        console.log("errRes", err);
      },
      ready: searchProduct !== "",
      refreshDeps: [searchProduct],
    }
  );

  return (
    <Box sx={{ background: theme.palette.background.paper }}>
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
            <IconButton sx={{ p: "10px" }} aria-label="menu">
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{
                ml: 1,
                flex: 1,
              }}
              placeholder="Search"
              onChange={(e) => setSearchProduct(e.target.value)}
            />
          </Paper>
        </Box>
        {searchProduct === "" ? (
          <>
            <Typography variant="body1" pl={2} fontWeight={"bold"}>
              Popular Categories
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
                    <Typography variant="body2">{category.name}</Typography>
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
                    </Grid>
                  ))}
              </Grid>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}

export default Search;
