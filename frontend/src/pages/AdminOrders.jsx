import { useEffect, useState } from "react";
import API_URL from "../services/api";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/orders/admin/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setOrders(data.orders);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${API_URL}/orders/admin/${orderId}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderStatus: newStatus,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order._id === orderId
            ? {
                ...order,
                orderStatus: newStatus,
              }
            : order
        )
      );

      alert("Order status updated successfully!");
    } else {
      alert(data.message || "Failed to update order status.");
    }
  } catch (error) {
    console.error("Failed to update order status:", error);
    alert("Something went wrong while updating the order.");
  }
};
  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <p>Loading orders...</p>;
  }

  return (
    <div>
      <h1>Manage Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id}>
            <h3>
              Order #{order._id.slice(-6)}
            </h3>

            <p>
              Customer: {order.user?.name}
            </p>

            <p>
              Email: {order.user?.email}
            </p>

            <h4>Items:</h4>

            {order.items.map((item, index) => (
              <p key={index}>
                {item.name} × {item.quantity} — ₹
                {item.price * item.quantity}
              </p>
            ))}

            <p>
              <strong>
                Total: ₹{order.totalAmount}
              </strong>
            </p>

            <p>
              Payment: {order.paymentMethod}
            </p>

            <p>
              Payment Status: {order.paymentStatus}
            </p>

            <div>
  <label>Order Status: </label>

  <select
    value={order.orderStatus}
    onChange={(e) =>
      updateOrderStatus(order._id, e.target.value)
    }
  >
    <option value="Pending">Pending</option>
    <option value="Confirmed">Confirmed</option>
    <option value="Preparing">Preparing</option>
    <option value="Out for Delivery">
      Out for Delivery
    </option>
    <option value="Delivered">Delivered</option>
  </select>
</div>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default AdminOrders;