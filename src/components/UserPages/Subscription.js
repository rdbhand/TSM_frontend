import { useEffect, useState } from "react";

const Subscription = ({ userData }) => {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const userId = userData?.userId;
        if (!userId) return;

        const res = await fetch(`http://localhost:8080/api/subscriptions?userId=${userId}`);
        const data = await res.json();
        setSubscription(data);
      } catch (err) {
        console.error("Error fetching subscription", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [userData]);

  // INTERNAL CSS
  const styles = {
    container: {
      maxWidth: "550px",
      margin: "30px auto",
      padding: "20px",
      borderRadius: "12px",
      background: "#ffffff",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      fontFamily: "Arial"
    },
    title: { fontSize: "22px", fontWeight: "bold", marginBottom: "10px" },
    item: { margin: "6px 0", fontSize: "16px" },
    highlight: { color: "#1976d2", fontWeight: "bold" }
  };

  if (loading) return <p>Loading subscription...</p>;
  if (!subscription) return <p>No active subscription found.</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>My Subscription</h2>

      <p style={styles.item}>
        <strong>Plan:</strong> {subscription.plan.name}
      </p>

      <p style={styles.item}>
        <strong>Meal Type:</strong> {subscription.plan.mealType}
      </p>

      <p style={styles.item}>
        <strong>Duration:</strong> {subscription.plan.durationDays} days
      </p>

      <p style={styles.item}>
        <strong>Start Date:</strong>{" "}
        <span style={styles.highlight}>{subscription.startDate}</span>
      </p>

      <p style={styles.item}>
        <strong>End Date:</strong>{" "}
        <span style={styles.highlight}>{subscription.endDate}</span>
      </p>

      <p style={styles.item}>
        <strong>Status:</strong> {subscription.status}
      </p>

      <p style={styles.item}>
        <strong>Total Amount:</strong> ₹{subscription.totalAmount}
      </p>
    </div>
  );
};

export default Subscription;
