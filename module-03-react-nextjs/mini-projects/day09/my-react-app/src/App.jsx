import { BrowserRouter, Routes, Route,} from "react-router-dom";

import {lazy,Suspense,} from "react";

import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import ErrorBoundary from "./components/ErrorBoundary";

import Home from "./components/Home";
import Menu from "./components/Menu";

import Cart from "./pages/Cart";
import DishDetail from "./pages/DishDetail";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

import { AuthProvider } from "./Context/AuthContext";
import { ThemeProvider } from "./Context/ThemeContext";

const Checkout = lazy(() => import("./pages/Checkout"));

function Skeleton() {
  return (
    <section>
      <h2>Loading...</h2>
      <p>Please wait while the page loads.</p>
    </section>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />

              <Route
                path="menu"
                element={
                  <ErrorBoundary
                    title="Menu unavailable"
                    message="The menu failed to load."
                  >
                    <Menu />
                  </ErrorBoundary>
                }
              />

              <Route
                path="menu/:id"
                element={<DishDetail />}
              />

              <Route
                path="cart"
                element={
                  <ErrorBoundary
                    title="Cart unavailable"
                    message="Your cart could not be loaded."
                  >
                    <Cart />
                  </ErrorBoundary>
                }
              />

              <Route
                path="login"
                element={<Login />}
              />

              <Route
                path="checkout"
                element={
                  <RequireAuth>
                    <Suspense fallback={<Skeleton />}>
                      <Checkout />
                    </Suspense>
                  </RequireAuth>
                }
              />

              <Route
                path="*"
                element={<NotFound />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;