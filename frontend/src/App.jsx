import { useContext } from "react";
import Login from "./pages/Login";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user, logout } = useContext(AuthContext);

  if (!user) {
    return <Login />;
  }

  return (
    <div>
      <h2>Welcome, {user.name}!</h2>

      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default App;