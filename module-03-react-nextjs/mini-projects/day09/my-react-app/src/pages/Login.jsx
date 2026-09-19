import { useLocation, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogin() {
    localStorage.setItem("isLoggedIn", "true");

    const from =
      location.state?.from?.pathname || "/";

    navigate(from, { replace: true });
  }

  return (
    <section>
      <h2>Sign In</h2>

      <p>Please sign in to continue to checkout.</p>

      <button onClick={handleLogin}>
        Sign In
      </button>
    </section>
  );
}

export default Login;