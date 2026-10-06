import { useState } from "react";

function Checkout({ onPayment }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const deliveryDetails = {
      name,
      phone,
      address,
      city,
      pincode,
    };

    onPayment(deliveryDetails);
  };

  return (
    <div>
      <h2>Checkout</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name</label>
          <br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            required
          />
        </div>

        <br />

        <div>
          <label>Phone Number</label>
          <br />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            required
          />
        </div>

        <br />

        <div>
          <label>Delivery Address</label>
          <br />
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your delivery address"
            required
          />
        </div>

        <br />

        <div>
          <label>City</label>
          <br />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter your city"
            required
          />
        </div>

        <br />

        <div>
          <label>Pincode</label>
          <br />
          <input
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            placeholder="Enter your pincode"
            required
          />
        </div>

        <br />

        <button type="submit">
          Continue to Payment
        </button>
      </form>
    </div>
  );
}

export default Checkout;