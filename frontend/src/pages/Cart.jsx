import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    getCartTotal,
  } = useContext(CartContext);

  if (cartItems.length === 0) {
    return (
      <div>
        <h2>Your Cart</h2>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Your Cart</h2>

      {cartItems.map((item) => (
        <div key={item._id}>
          <h3>{item.name}</h3>

          <p>Price: ₹{item.price}</p>

          <p>
            Quantity: {item.quantity}
          </p>

          <button onClick={() => decreaseQuantity(item._id)}>
            -
          </button>

          <button onClick={() => increaseQuantity(item._id)}>
            +
          </button>

          <button onClick={() => removeFromCart(item._id)}>
            Remove
          </button>

          <p>
            Item Total: ₹{item.price * item.quantity}
          </p>

          <hr />
        </div>
      ))}

      <h3>Total: ₹{getCartTotal()}</h3>

      <button>Proceed to Checkout</button>
    </div>
  );
}

export default Cart;