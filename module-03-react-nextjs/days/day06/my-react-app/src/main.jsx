import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import CartProvider from "./components/CartProvider.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import Layout from "./components/Layout.jsx";
import RequiredAuth from "./components/RequiredAuth.jsx";

import Home from "./pages/Home.jsx";
import MenuPage from "./pages/MenuPage.jsx";
import MenuDetail from "./pages/MenuDetail.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";

import "./css/style.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />

              <Route path="menu" element={<MenuPage />} />

              <Route
                path="menu/:id"
                element={<MenuDetail />}
              />

              <Route path="login" element={<Login />} />

              <Route element={<RequiredAuth />}>
                <Route
                  path="checkout"
                  element={<CheckoutPage />}
                />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </CartProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);