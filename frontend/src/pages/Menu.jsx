import { useEffect, useState, useContext } from "react";
import API_URL from "../services/api";
import { CartContext } from "../context/CartContext";

function Menu() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch(`${API_URL}/foods`);
        const data = await response.json();

        if (response.ok) {
          setFoods(data.foods);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Failed to fetch foods:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  if (loading) {
    return <p>Loading menu...</p>;
  }

  return (
    <div>
      <h2>Our Menu</h2>

      {foods.length === 0 ? (
        <p>No food items available.</p>
      ) : (
        foods.map((food) => (
          <div key={food._id}>
            <h3>{food.name}</h3>

            <p>{food.description}</p>

            <p>₹{food.price}</p>

            <p>Category: {food.category}</p>

            <p>
              {food.available ? "Available" : "Not Available"}
            </p>

            {food.available && (
              <button onClick={() => addToCart(food)}>
                Add to Cart
              </button>
            )}

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default Menu;