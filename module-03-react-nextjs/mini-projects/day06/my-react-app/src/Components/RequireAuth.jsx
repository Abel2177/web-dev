import { Navigate, useLocation } from "react-router-dom";

function RequireAuth({ children }) {
  const isLoading = false; // replace with real auth loading
  const isSignedIn = false; // replace with real auth state
  const location = useLocation();

  if (isLoading) return <p>Loading...</p>;
  if (!isSignedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

export default RequireAuth;
