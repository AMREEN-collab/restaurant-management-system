import { useContext, useState } from "react";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import { AuthContext } from "./context/AuthContext";
import { CartContext } from "./context/CartContext";

function App() {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);

  const [showCart, setShowCart] = useState(false);

  if (!user) {
    return <Login />;
  }

  return (
    <div>
      <h2>Welcome, {user.name}!</h2>

      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>

      <button onClick={logout}>Logout</button>

      <button onClick={() => setShowCart(!showCart)}>
        🛒 Cart ({cartItems.length})
      </button>

      <hr />

      {showCart ? <Cart /> : <Menu />}
    </div>
  );
}

export default App;