import { useLocation, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  function handleLogin(event) {
    event.preventDefault();

    localStorage.setItem("isSignedIn", "true");

    navigate(from, { replace: true });
  }

  return (
    <section>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" required />
        </div>

        <br />

        <div>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" required />
        </div>

        <br />

        <button type="submit">Login</button>
      </form>
    </section>
  );
}

export default Login;