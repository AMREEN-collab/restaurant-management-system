import { useEffect, useState } from "react";
import API_URL from "../services/api";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `${API_URL}/orders/my-orders`,
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

    fetchOrders();
  }, []);

  if (loading) {
    return <p>Loading orders...</p>;
  }

  return (
    <div>
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>You have not placed any orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id}>
            <h3>
              Order #{order._id.slice(-6)}
            </h3>

            {order.items.map((item, index) => (
              <div key={index}>
                <p>
                  {item.name} × {item.quantity}
                </p>

                <p>
                  ₹{item.price * item.quantity}
                </p>
              </div>
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

            <p>
              Order Status: {order.orderStatus}
            </p>

            <p>
              Ordered on:{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;