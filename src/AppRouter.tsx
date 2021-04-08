import React, { lazy, Suspense, useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { observer } from "mobx-react";
import { CheckoutProvider, CartProvider, AuthContext } from "./contexts";
import { CartStore, CheckoutStore } from "./stores";
import { PageLoader } from "./components/PageLoader";

const Login = lazy(() => import("./pages/Login"));
const Products = lazy(() => import("./pages/Products"));
const Layout = lazy(() => import("./components/Layout"));
const Checkout = lazy(() => import("./pages/Checkout"));

export const AppRouter = () => {
  const authStore = useContext(AuthContext);

  const renderProtectedRoutes = () => (
    <CartProvider value={new CartStore()}>
      <Layout>
        <Route exact path="/" component={Products} />
        <CheckoutProvider value={new CheckoutStore()}>
          <Route exact path="/checkout" component={Checkout} />
        </CheckoutProvider>
      </Layout>
    </CartProvider>
  );

  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Switch>
          {authStore.isAuthenticated && renderProtectedRoutes()}
          <Route path="/login" component={Login} />
          <Redirect to="/login" />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default observer(AppRouter);
