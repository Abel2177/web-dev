import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";

import Home from "./components/Home";
import Menu from "./components/Menu";

import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import DishDetail from "./pages/DishDetail";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

import { AuthProvider } from "./Context/AuthContext";
import { ThemeProvider } from "./Context/ThemeContext";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />

              <Route path="menu" element={<Menu />} />

              <Route path="menu/:id" element={<DishDetail />} />

              <Route path="cart" element={<Cart />} />

              <Route path="login" element={<Login />} />

              <Route
                path="checkout"
                element={
                  <RequireAuth>
                    <Checkout />
                  </RequireAuth>
                }
              />

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;