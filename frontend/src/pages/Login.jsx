import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API_URL from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.user, data.token);

        alert("Login successful!");

        console.log(data.user);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <br />

        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        <br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;