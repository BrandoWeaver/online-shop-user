import React, { useContext } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../utils/route-util";
import { LoadingSpiner } from "../../components/Loading";
import ErrorResponse from "../../components/ErrorResponse";
import { useRequest } from "ahooks";
import { PRODUCT_API } from "../../api/Product";
import CategoryGrid from "./CategoryCard";
import ProductDrawer from "./ProductDrawer";
import ProductCard from "./productCard";
import SectionHeader from "./SectionHeader";
import { useAuthContext } from "../../contexts/AuthContext";
import { CartContext } from "../../contexts/CartContext";
function Product() {
  const navigate = useNavigate();
  const { setCategories } = useAuthContext();
  const { cart, getTotalPrice, clearCart } = useContext(CartContext)!;

  // const [listCate, setCate] = useState<Iproduct.Category[]>([]);
  // const [search, setSearch] = useState("");
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const {
    runAsync: fetchProductList,
    loading: loadingLogin,
    data: allProduct,
    error: errorListProduct,
  } = useRequest(PRODUCT_API.listProduct, {
    onSuccess: (data) => {
      console.log("SuccessRes", data);
    },
    onError: (err) => {
      console.log("errRes", err);
    },
  });
  const { loading: loadingCategories, data: allCategories } = useRequest(
    PRODUCT_API.listCategory,
    {
      onSuccess: (data) => {
        const formatListCategories = data.categories.map((i) => {
          return {
            id: i.cate_id,
            name: i.name,
          };
        });
        setCategories(formatListCategories);
        console.log("formatListCategories", formatListCategories);
      },
      onError: (err) => {
        console.log("errRes", err);
      },
    }
  );
  // useEffect(() => {
  //   fetchProductList();
  // }, [search, listCate]);
  const theme = useTheme();
  const handleRefresh = () => {
    fetchProductList();
  };
  const { data: allPopularProduct, error: errorListPopularProduct } =
    useRequest(() => PRODUCT_API.pupularProduct(2), {
      onSuccess: (data) => {
        console.log("SuccessRes", data);
      },
      onError: (err) => {
        console.log("errRes", err);
      },
    });
  return (
    <Box
      sx={{
        flexGrow: 1,
        height: "calc(100vh - 70px)",
        overflow: "scroll",

        pt: 1,
        pb: 6,
        background: theme.palette.background.default,
      }}
    >
      <CategoryGrid
        allCategories={allCategories?.categories}
        loadingCategories={loadingCategories}
      />

      <SectionHeader
        title="Popular Products"
        onClick={() => navigate(ROUTE_PATH.PopularProduct)}
      />
      {loadingLogin ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 320px)",
          }}
        >
          <LoadingSpiner size={25} />
        </Box>
      ) : (
        <>
          {errorListProduct && (
            <ErrorResponse
              message={"Error Occurred"}
              buttonText="Refresh"
              buttonAction={handleRefresh}
            />
          )}
          {!errorListPopularProduct &&
          allPopularProduct &&
          allPopularProduct.products.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "calc(100vh - 320px)",
              }}
            >
              <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                No products found.
              </Typography>
            </Box>
          ) : (
            !errorListPopularProduct &&
            allPopularProduct && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  overflowY: "scroll",
                  maxWidth: { xs: "100vw", md: "80vw" },
                  pl: 1,
                  "::-webkit-scrollbar": {
                    display: "none",
                  },
                }}
              >
                {allPopularProduct.products.map((product, index) => {
                  const isProductIdIncluded = Object.values(cart).some(
                    (products) => allPopularProduct.products.includes(products)
                  );
                  return (
                    <Box
                      key={product._id}
                      onClick={() => {
                        // navigate(ROUTE_PATH.productDetail.replace(":id", "1"));
                        setDrawerOpen(true);
                      }}
                      sx={{ mr: 1 }}
                    >
                      <ProductCard
                        isProductIdIncluded={isProductIdIncluded}
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
                      />
                    </Box>
                  );
                })}
              </Box>
            )
          )}
        </>
      )}
      <SectionHeader
        title="All Products"
        onClick={() => navigate(ROUTE_PATH.categoryList.replace(":id", "0"))}
      />
      {loadingLogin ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 320px)",
          }}
        >
          <LoadingSpiner size={25} />
        </Box>
      ) : (
        <>
          {errorListProduct && (
            <ErrorResponse
              message={"Error Occurred"}
              buttonText="Refresh"
              buttonAction={handleRefresh}
            />
          )}
          {!errorListProduct &&
          allProduct &&
          allProduct.products.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "calc(100vh - 320px)",
              }}
            >
              <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                No products found.
              </Typography>
            </Box>
          ) : (
            !errorListProduct &&
            allProduct && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  overflowY: "scroll",
                  maxWidth: { xs: "100vw", md: "80vw" },
                  pl: 1,
                  "::-webkit-scrollbar": {
                    display: "none",
                  },
                }}
              >
                {allProduct.products.map((product, index) => {
                  const isProductIdIncluded = Object.values(cart).some(
                    (products) => allProduct.products.includes(products)
                  );
                  return (
                    <Box
                      key={product._id}
                      onClick={() => {
                        // navigate(ROUTE_PATH.productDetail.replace(":id", "1"));
                        setDrawerOpen(true);
                      }}
                      sx={{ mr: 1 }}
                    >
                      <ProductCard
                        isProductIdIncluded={isProductIdIncluded}
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
                      />
                    </Box>
                  );
                })}
              </Box>
            )
          )}
        </>
      )}
      <ProductDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
    </Box>
  );
}
export default Product;
