import { useContext, useState } from "react";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import { AuthContext } from "./context/AuthContext";
import { CartContext } from "./context/CartContext";
import MyOrders from "./pages/MyOrders";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrders from "./pages/AdminOrders";

function App() {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);

  const [page, setPage] = useState("menu");
  const [deliveryDetails, setDeliveryDetails] = useState(null);

  if (!user) {
    return <Login />;
  }

  const handleCheckout = () => {
    setPage("checkout");
  };

  const handlePayment = (details) => {
    setDeliveryDetails(details);
    setPage("payment");
  };

  const handleOrderPlaced = () => {
    alert("Order placed successfully!");
    setPage("menu");
  };

  return (
    <div>
      <h2>Welcome, {user.name}!</h2>

      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>

      <button onClick={logout}>Logout</button>

      <button onClick={() => setPage("cart")}>
        🛒 Cart ({cartItems.length})
      </button>
      <button onClick={() => setPage("orders")}>
  📋 My Orders
</button>
       {user.role === "admin" && (
  <button onClick={() => setPage("admin")}>
    👨‍💼 Admin Dashboard
  </button>
)}
{user.role === "admin" && (
  <button onClick={() => setPage("admin-orders")}>
    📦 Manage Orders
  </button>
)}

      <hr />

      {page === "menu" && <Menu />}

      {page === "cart" && (
        <Cart onCheckout={handleCheckout} />
      )}

      {page === "checkout" && (
        <Checkout onPayment={handlePayment} />
      )}

      {page === "payment" && (
        <Payment
          deliveryDetails={deliveryDetails}
          onOrderPlaced={handleOrderPlaced}
        />
      )}
      {page === "orders" && <MyOrders />}
      {page === "admin" && user.role === "admin" && (
  <AdminDashboard />
)}
{page === "admin-orders" && user.role === "admin" && (
  <AdminOrders />
)}
    </div>
  );
}

export default App;