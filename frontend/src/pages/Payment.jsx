import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import API_URL from "../services/api";

function Payment({ deliveryDetails, onOrderPlaced }) {
  const { cartItems, getCartTotal, removeFromCart } =
    useContext(CartContext);

  const [paymentMethod, setPaymentMethod] = useState("");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    if (paymentMethod === "UPI" && !upiId) {
      alert("Please enter your UPI ID.");
      return;
    }

    if (
      paymentMethod === "Card" &&
      (!cardNumber || !expiry || !cvv)
    ) {
      alert("Please enter all card details.");
      return;
    }

    if (!deliveryDetails) {
      alert("Delivery details are missing.");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const orderItems = cartItems.map((item) => ({
        food: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));

      const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: orderItems,
          totalAmount: getCartTotal(),
          deliveryAddress: deliveryDetails,
          paymentMethod,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Order placed successfully!");

        cartItems.forEach((item) => {
          removeFromCart(item._id);
        });

        onOrderPlaced();
      } else {
        alert(data.message || "Failed to place order.");
      }
    } catch (error) {
      console.error("Order error:", error);
      alert("Something went wrong while placing the order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Payment</h2>

      <h3>Total Amount: ₹{getCartTotal()}</h3>

      <form onSubmit={handlePayment}>
        <h3>Select Payment Method</h3>

        <div>
          <label>
            <input
              type="radio"
              name="payment"
              value="UPI"
              checked={paymentMethod === "UPI"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            📱 UPI
          </label>
        </div>

        <br />

        {paymentMethod === "UPI" && (
          <div>
            <label>UPI ID</label>
            <br />

            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="example@upi"
            />
          </div>
        )}

        <br />

        <div>
          <label>
            <input
              type="radio"
              name="payment"
              value="Card"
              checked={paymentMethod === "Card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            💳 Card
          </label>
        </div>

        <br />

        {paymentMethod === "Card" && (
          <div>
            <label>Card Number</label>
            <br />

            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="1234 5678 9012 3456"
            />

            <br />
            <br />

            <label>Expiry</label>
            <br />

            <input
              type="text"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              placeholder="MM/YY"
            />

            <br />
            <br />

            <label>CVV</label>
            <br />

            <input
              type="password"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="123"
            />
          </div>
        )}

        <br />

        <div>
          <label>
            <input
              type="radio"
              name="payment"
              value="Cash on Delivery"
              checked={paymentMethod === "Cash on Delivery"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            💵 Cash on Delivery
          </label>
        </div>

        <br />

        <button type="submit" disabled={loading}>
          {loading ? "Placing Order..." : "Pay & Place Order"}
        </button>
      </form>
    </div>
  );
}

export default Payment;