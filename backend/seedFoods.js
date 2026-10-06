import dotenv from "dotenv";
import mongoose from "mongoose";
import Food from "./models/Food.js";

dotenv.config();

const foods = [
  {
    name: "Mutton Biryani",
    description: "Fragrant basmati rice cooked with tender mutton and aromatic spices.",
    price: 280,
    category: "Biryani",
    image: "",
  },
  {
    name: "Veg Biryani",
    description: "Flavorful basmati rice cooked with fresh vegetables and spices.",
    price: 180,
    category: "Biryani",
    image: "",
  },
  {
    name: "Chicken 65",
    description: "Crispy and spicy fried chicken pieces seasoned with aromatic spices.",
    price: 190,
    category: "Starters",
    image: "",
  },
  {
    name: "Chicken Manchurian",
    description: "Crispy chicken tossed in a flavorful Indo-Chinese Manchurian sauce.",
    price: 210,
    category: "Starters",
    image: "",
  },
  {
    name: "Paneer 65",
    description: "Crispy paneer pieces tossed with herbs and Indian spices.",
    price: 170,
    category: "Starters",
    image: "",
  },
  {
    name: "Butter Chicken",
    description: "Tender chicken cooked in a creamy tomato-based butter sauce.",
    price: 240,
    category: "Main Course",
    image: "",
  },
  {
    name: "Paneer Butter Masala",
    description: "Soft paneer cooked in a rich and creamy tomato gravy.",
    price: 200,
    category: "Main Course",
    image: "",
  },
  {
    name: "Dal Tadka",
    description: "Yellow lentils tempered with garlic, cumin and Indian spices.",
    price: 150,
    category: "Main Course",
    image: "",
  },
  {
    name: "Chicken Pizza",
    description: "Cheesy pizza topped with seasoned chicken and fresh vegetables.",
    price: 260,
    category: "Pizza",
    image: "",
  },
  {
    name: "Veg Pizza",
    description: "Cheesy pizza loaded with fresh vegetables and herbs.",
    price: 220,
    category: "Pizza",
    image: "",
  },
  {
    name: "Chicken Burger",
    description: "Juicy crispy chicken patty served with fresh vegetables and sauce.",
    price: 180,
    category: "Burgers",
    image: "",
  },
  {
    name: "Veg Burger",
    description: "Crispy vegetable patty burger with fresh lettuce and sauces.",
    price: 150,
    category: "Burgers",
    image: "",
  },
  {
    name: "Coke",
    description: "Chilled refreshing Coca-Cola soft drink.",
    price: 60,
    category: "Drinks",
    image: "",
  },
  {
    name: "Fresh Lime Soda",
    description: "Refreshing lime drink prepared with fresh lime and soda.",
    price: 80,
    category: "Drinks",
    image: "",
  },
];

const seedFoods = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    await Food.insertMany(foods);

    console.log(`${foods.length} food items added successfully`);

    await mongoose.connection.close();

    console.log("Database connection closed");
  } catch (error) {
    console.error("Error adding food items:", error.message);
    process.exit(1);
  }
};

seedFoods();