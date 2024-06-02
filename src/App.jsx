import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Admin from "./Components/Admin/Admin";
import Automobiles from "./Components/Customer/Automobiles";
import Fashion from "./Components/Customer/Fashion";
import HomeProducts from "./Components/Customer/HomeProducts";
import TechnologyGadgets from "./Components/Customer/TechnologyGadgets";
import Home from "./Components/Home/Home";
import Supplier from "./Components/Supplier/Supplier";
import EcommerceCard from "./Components/card/EcommerceCard";
import ProductDetails from "./Components/card/ProductDetails";
import Cart from "./Components/cart/Cart";
import { CartProvider } from "./Components/cart/CartContext";
import CheckoutPage from "./Components/checkout/CheckoutPage";
import OrderSuccessPage from "./Components/checkout/OrderSuccessPage";
import PaymentForm from "./Components/checkout/PaymentForm";
import { AuthProvider } from "./Components/login-Signup/AuthContext";
import AuthPage from "./Components/login-Signup/AuthPage";
import ForgotPassword from "./Components/login-Signup/ForgotPassword";
import Login from "./Components/login-Signup/Login";
import SignInSignUpPage from "./Components/login-Signup/SignInSignUpPage";
import Navbar from "./Components/navbar/Navbar";
import { UserProvider } from "./Components/navbar/UserContext";
import AccountSettings from "./Components/profile/Account settings/AccountSettings";
import Component from "./Components/profile/Component";
import ProfilePage from "./Components/profile/ProfilePage";
import OrderHistory from "./Components/profile/orderhistory/OrderHistory";
import SavedAddresses from "./Components/profile/savedadress/SavedAddresses";
function App() {
  // Check if current location matches the home page route
  const isHomePage = location.pathname === "/";

  return (
    <Router>
      <CartProvider>
        <AuthProvider>
          <UserProvider>
            <Navbar />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="cart" element={<Cart />} />
              <Route path="signinsignuppage" element={<SignInSignUpPage />} />
              <Route path="admin" element={<Admin />} />
              <Route path="supplier" element={<Supplier />} />
              <Route path="authpage" element={<AuthPage />} />
              <Route path="profilepage" element={<ProfilePage />} />
              <Route path="orderhistory" element={<OrderHistory />} />
              <Route path="savedadress" element={<SavedAddresses />} />
              <Route path="accountsettings" element={<AccountSettings />} />
              <Route
                path="/product-details/:productName"
                element={<ProductDetails />}
              />
              <Route path="ecommercecard" element={<EcommerceCard />} />

              <Route path="fashion" element={<Fashion />} />
              <Route path="homeproducts" element={<HomeProducts />} />
              <Route path="automobiles" element={<Automobiles />} />
              <Route path="checkoutpage" element={<CheckoutPage />} />
              <Route path="paymentform" element={<PaymentForm />} />
              <Route path="ordersuccesspage" element={<OrderSuccessPage />} />
              <Route path="technologygadgets" element={<TechnologyGadgets />} />
              <Route path="component" element={<Component />} />
              <Route path="forgotpassword" element={<ForgotPassword />} />

              {/* Add more routes for other pages */}
            </Routes>
          </UserProvider>
        </AuthProvider>
      </CartProvider>
    </Router>
  );
}
export default App;
