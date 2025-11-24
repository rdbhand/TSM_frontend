import { useEffect, useState } from "react";

const Subscription = ({ userData }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const userId = userData?.userId;
        if (!userId) return;

        const res = await fetch(
          `http://localhost:8080/api/subscriptions?userId=${userId}`
        );
        const data = await res.json();

        if (Array.isArray(data)) {
          setSubscriptions(data);
          sessionStorage.setItem("subscriptions", JSON.stringify(data));
        }
      } catch (err) {
        console.error("Error fetching subscription", err);

        // Fallback to sessionStorage
        const stored = sessionStorage.getItem("subscriptions");
        if (stored) {
          setSubscriptions(JSON.parse(stored));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [userData]);

  // Styles
  const styles = {
    container: {
      maxWidth: "650px",
      margin: "30px auto",
      padding: "20px",
      borderRadius: "12px",
      background: "#ffffff",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      fontFamily: "Arial",
    },
    title: { fontSize: "24px", fontWeight: "bold", marginBottom: "15px" },
    card: {
      background: "#eef4ff",
      padding: "20px",
      borderRadius: "10px",
      marginBottom: "20px",
      border: "1px solid #c3d6ff",
    },
    sectionTitle: {
      fontSize: "18px",
      fontWeight: "bold",
      marginTop: "15px",
      marginBottom: "8px",
      color: "#0d47a1",
    },
    item: { margin: "6px 0", fontSize: "15px" },
    highlight: { color: "#0d47a1", fontWeight: "bold" },
  };

  if (loading) return <p>Loading subscriptions...</p>;
  if (!subscriptions.length) return <p>No subscriptions found.</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>My Subscriptions</h2>

      {subscriptions.map((subscription, index) => {
        const provider = subscription.plan?.provider;

        return (
          <div key={index} style={styles.card}>
            {/* PLAN DETAILS */}
            <div>
              <h3 style={styles.sectionTitle}>Plan Details</h3>
              <p style={styles.item}>
                <strong>Plan:</strong> {subscription.plan?.name}
              </p>
              <p style={styles.item}>
                <strong>Meal Type:</strong> {subscription.plan?.mealType}
              </p>
              <p style={styles.item}>
                <strong>Duration:</strong> {subscription.plan?.durationDays}{" "}
                days
              </p>
            </div>

            {/* SUBSCRIPTION INFO */}
            <div>
              <h3 style={styles.sectionTitle}>Subscription Info</h3>
              <p style={styles.item}>
                <strong>Start Date:</strong>{" "}
                <span style={styles.highlight}>
                  {subscription.startDate}
                </span>
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

            {/* PROVIDER DETAILS */}
            <div>
              <h3 style={styles.sectionTitle}>Provider Details</h3>

              <p style={styles.item}>
                <strong>Name:</strong> {provider?.name}
              </p>

              <p style={styles.item}>
                <strong>Phone:</strong> {provider?.phone}
              </p>

              <p style={styles.item}>
                <strong>Email:</strong> {provider?.email}
              </p>

              <p style={styles.item}>
                <strong>Address:</strong> {provider?.address}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Subscription;
