import { useContext, useState } from "react";
import CateHead from "./categoryHead";
import { useRequest } from "ahooks";
import { PRODUCT_API } from "../../api/Product";
import { Box, Grid, Typography } from "@mui/material";
import ProductCard from "../Product/productCard";
import { LoadingSpiner } from "../../components/Loading";
import { useNavigate, useParams } from "react-router-dom";
import CheckoutButton from "../Cart/CheckoutButton";
import { CartContext } from "../../contexts/CartContext";
import { ROUTE_PATH } from "../../utils/route-util";
import ProductDrawer from "../Product/ProductDrawer";

function CategoryList() {
  const currentId = useParams();
  const [produtDetail, setProdudctDetail] = useState<Iproduct.Product>();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { cart, getTotalPrice, getProductIds } = useContext(CartContext)!;
  const navigate = useNavigate();
  console.log("id", currentId.id);
  const [cateId, setId] = useState(currentId.id || "");
  const { loading: loadingCategories, data: allCategories } = useRequest(
    PRODUCT_API.listCategory,
    {
      onSuccess: (data) => {
        console.log("allCategories", data);
      },
      onError: (err) => {
        console.log("errRes", err);
      },
    }
  );
  const { loading: loadingProductList, data: allProduct } = useRequest(
    () => PRODUCT_API.listProduct(cateId),
    {
      onSuccess: (data) => {
        console.log("SuccessRes", data);
      },
      onError: (err) => {
        console.log("errRes", err);
      },
      refreshDeps: [cateId],
    }
  );

  return (
    <Box>
      <ProductDrawer
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        productDetail={produtDetail}
      />
      <Box sx={{ position: "sticky", top: 0, zIndex: 1 }}>
        <CateHead
          allCategories={allCategories?.categories}
          setId={setId}
          id={cateId}
          loadingCategories={loadingCategories}
        />
      </Box>
      {loadingProductList ? (
        <Box
          sx={{
            height: "calc(100vh - 120px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoadingSpiner size={25} />
        </Box>
      ) : allProduct?.products.length !== 0 ? (
        <>
          <Grid container px={2} mt={13} spacing={1}>
            {allProduct &&
              allProduct.products.map((product, index) => (
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
        </>
      ) : (
        <Box
          sx={{
            height: "calc(100vh - 120px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>No Data</Typography>
        </Box>
      )}
    </Box>
  );
}

export default CategoryList;
