import { Navigate, Outlet, useLocation } from "react-router-dom";

function RequiredAuth() {
  const location = useLocation();

  const isAuthenticated =
    localStorage.getItem("isLoggedIn") === "true";

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
}

export default RequiredAuth;