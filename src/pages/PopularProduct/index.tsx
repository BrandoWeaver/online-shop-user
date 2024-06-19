import React from "react";
import { Toolbar, IconButton, Typography, useTheme, Grid } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import { ROUTE_PATH } from "../../utils/route-util";
import { useNavigate } from "react-router-dom";

import { useRequest } from "ahooks";
import { PRODUCT_API } from "../../api/Product";
import ProductCard from "../Product/productCard";

function PopularProduct() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { data: allProduct } = useRequest(() => PRODUCT_API.pupularProduct(2), {
    onSuccess: (data) => {
      console.log("SuccessRes", data);
    },
    onError: (err) => {
      console.log("errRes", err);
    },
  });
  return (
    <div>
      <Toolbar>
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
          Popular Products
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
      <Grid container px={2} mt={2} spacing={1}>
        {allProduct &&
          allProduct.products?.map((product, index) => (
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
    </div>
  );
}

export default PopularProduct;
