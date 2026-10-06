import { useEffect, useState } from "react";
import API_URL from "../services/api";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `${API_URL}/admin/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setStats(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error(
          "Failed to fetch dashboard statistics:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (!stats) {
    return <p>Failed to load dashboard.</p>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <p>
        Welcome to the Restaurant Management System Admin Panel.
      </p>

      <hr />

      <h2>Dashboard Statistics</h2>

      <p>
        📦 Total Orders: {stats.totalOrders}
      </p>

      <p>
        👥 Total Customers: {stats.totalCustomers}
      </p>

      <p>
        🍔 Total Food Items: {stats.totalFoodItems}
      </p>

      <p>
        💰 Total Sales: ₹{stats.totalSales}
      </p>
    </div>
  );
}

export default AdminDashboard;