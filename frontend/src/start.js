import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/header/Header";
import { ViewportProvider } from "./components/utils/viewPortHandler";
import Footer from "./components/Footer/Footer";
import ProductSearchResults from "./components/productSearchResults/ProductSearchresults";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { connect } from "react-redux";
import { FetchCategories } from "./redux/actions/CategoriesActions";
import productDetails from "./components/ProductDetails/ProductDetails";
import Home from "./components/Home/Home";
import SignUp from "./components/auth/signUp";
import Toast from "./components/utils/Toast";
import CheckoutScreen from "./components/Cart/checkoutScreen";
import PrivateRoute from "./components/utils/PrivateRoute";
import UserDashboard from "./components/user/UserDashboard";
import OrderConf from "./components/Cart/OrderConf";
import BookNotFound from "./components/BookNotFound/BookNotFound";
import Error404 from "./components/404/Error404";
import BookUpload from "./components/UserBookUpload/BookUpload";
import SellerRegistration from "./components/UserBookUpload/SellerRegistration";
import StaticRouter from "./components/staticPages/StaticRouter";
import ForgotPassword from "./components/auth/ForgotPassword";
import PasswordReset from "./components/auth/PasswordReset";
import OrderFailure from "./components/Cart/OrderFailure";
import ScrollToTop from "./components/ScrollToTop";

function Start(props) {
  const [cartToastShow, setCarToastShow] = React.useState(false);
  const [newCartLength, setNewCartLength] = React.useState(0);
  React.useEffect(() => props.getCategories(), []);
  React.useEffect(() => {
    if (props.cartHydrated && props.cartLength > newCartLength) {
      setCarToastShow(true);
      setNewCartLength(props.cartLength);
    }
  }, [props.cartLength, newCartLength, props.cartHydrated]);
  return (
    <ViewportProvider>
      <div className="App">
        <Toast
          isVisible={cartToastShow}
          onClose={() => setCarToastShow(false)}
          header="added"
          body="Item Added To cart"
        />
        <ScrollToTop />

        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signUp" component={SignUp} />
          <Route exact path="/order/failure" component={OrderFailure} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route path="/password-reset/:token" component={PasswordReset} />
          <Route exact path="/details" component={productDetails} />
          <PrivateRoute exact path="/checkout">
            <CheckoutScreen />
          </PrivateRoute>
          <PrivateRoute path="/profile/">
            <UserDashboard />
          </PrivateRoute>
          <PrivateRoute path="/order/confirmation">
            <OrderConf />
          </PrivateRoute>
          <PrivateRoute exact path="/upload-book">
            <BookUpload />
          </PrivateRoute>
          <PrivateRoute exact path="/seller-registration">
            <SellerRegistration />
          </PrivateRoute>
          <Route
            path="/cat/:catId/subCat/:subCatId"
            component={(props) => <ProductSearchResults {...props} isSubCat />}
          />
          <Route
            path="/cat/:catId/"
            component={(props) => <ProductSearchResults {...props} isCat />}
          />
          <Route
            path="/search"
            render={(props) => (
              <ProductSearchResults {...props} isSearch={true} />
            )}
          />
          <Route path="/static" component={StaticRouter} />
          <Route path="/books/:bookId" component={ProductDetails} />
          <Route path="/notFound" component={BookNotFound} />
          <Route path="/not-found-error" component={Error404} />
          <Route component={Error404} />
        </Switch>
        <Footer />
      </div>
    </ViewportProvider>
  );
}
const mapDispatchToProps = (dispatch) => ({
  getCategories: () => {
    dispatch(FetchCategories());
  },
});
const mapStateToProps = (state) => ({
  cartLength: state.cart.items.length,
  cartHydrated: state.cart.hydrated,
});

export default connect(mapStateToProps, mapDispatchToProps)(Start);
