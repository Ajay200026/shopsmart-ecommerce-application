import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CartProvider } from "./Components/cart/CartContext.jsx";
import { CheckoutProvider } from "./Components/checkout/CheckoutContext.jsx";
import { AuthProvider } from "./Components/login-Signup/AuthContext.jsx";
import { UserProvider } from "./Components/navbar/UserContext.jsx";
import "./index.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <CheckoutProvider>
        <NextUIProvider>
          <UserProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </UserProvider>
        </NextUIProvider>
      </CheckoutProvider>
    </CartProvider>
  </React.StrictMode>
);
