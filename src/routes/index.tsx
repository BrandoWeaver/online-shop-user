import { Suspense, lazy } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import Layout from "../layouts";
// import { Actions } from "../utils/data-util";
import { ROUTE_PATH } from "../utils/route-util";
const Account = lazy(() => import("../pages/Account/index"));
const Login = lazy(() => import("../pages/Login/index"));
const Signup = lazy(() => import("../pages/Signup/index"));
const Product = lazy(() => import("../pages/Product/index"));
const Cart = lazy(() => import("../pages/Cart/index"));
const Order = lazy(() => import("../pages/Order/index"));
const Search = lazy(() => import("../pages/Search/index"));
const ProductDetail = lazy(() => import("../pages/Product/ProDetail"));
const CategoryList = lazy(() => import("../pages/Category/index"));
const Inbox = lazy(() => import("../pages/Inbox/index"));
const PopularProduct = lazy(() => import("../pages/PopularProduct/index"));
const Aboutus = lazy(() => import("../pages/AboutUs/index"));
const Term = lazy(() => import("../pages/TermOfUse/index"));
const Checkout = lazy(() => import("../pages/Checkout/index"));
const router = createBrowserRouter(
  [
    {
      path: ROUTE_PATH.login,
      element: (
        <Suspense>
          <Login />
        </Suspense>
      ),
    },
    {
      path: ROUTE_PATH.checkout,
      element: (
        <Suspense>
          <Checkout />
        </Suspense>
      ),
    },
    {
      path: ROUTE_PATH.about_us,
      element: (
        <Suspense>
          <Aboutus />
        </Suspense>
      ),
    },
    {
      path: ROUTE_PATH.term,
      element: (
        <Suspense>
          <Term />
        </Suspense>
      ),
    },
    {
      path: ROUTE_PATH.singup,
      element: (
        <Suspense>
          <Signup />
        </Suspense>
      ),
    },
    {
      path: ROUTE_PATH.search,
      element: (
        <Suspense>
          <Search />
        </Suspense>
      ),
    },
    {
      path: ROUTE_PATH.PopularProduct,
      element: (
        <Suspense>
          <PopularProduct />
        </Suspense>
      ),
    },
    {
      path: ROUTE_PATH.categoryList,
      element: (
        <Suspense>
          <CategoryList />
        </Suspense>
      ),
    },
    {
      path: ROUTE_PATH.root,
      element: <Layout />,
      errorElement: <Navigate to={ROUTE_PATH.product} />,
      children: [
        {
          path: ROUTE_PATH.root,
          element: <Navigate to={ROUTE_PATH.product} replace />,
        },
        {
          path: ROUTE_PATH.productDetail,
          element: (
            <Suspense>
              <ProductDetail />
            </Suspense>
          ),
        },
        {
          path: ROUTE_PATH.product,
          element: (
            <Suspense>
              <Product />
            </Suspense>
          ),
        },
        {
          path: ROUTE_PATH.cart,
          element: (
            <Suspense>
              <Cart />
            </Suspense>
          ),
        },
        {
          path: ROUTE_PATH.order,
          element: (
            <Suspense>
              <Order />
            </Suspense>
          ),
        },
        {
          path: ROUTE_PATH.account,
          element: (
            <Suspense>
              <Account />
            </Suspense>
          ),
        },
        {
          path: ROUTE_PATH.inbox,
          element: (
            <Suspense>
              <Inbox />
            </Suspense>
          ),
        },
      ],
    },
  ],
  { basename: process.env.REACT_APP_PUBLIC_URL }
);

export { router };
