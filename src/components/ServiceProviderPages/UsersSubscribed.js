import { useEffect, useState } from "react";

export default function UsersSubscribed() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const provider = JSON.parse(sessionStorage.getItem("userData"));
  const providerId = provider?.userId;

  useEffect(() => {
    if (!providerId) return;

    fetch(`http://localhost:8080/api/subscriptions/provider/${providerId}`)
      .then((res) => res.json())
      .then((data) => {
        setSubscriptions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching subscriptions:", err);
        setLoading(false);
      });
  }, [providerId]);

  if (loading) return <p style={styles.loading}>Loading subscribed users...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Subscribed Users</h2>

      {subscriptions.length === 0 ? (
        <p style={styles.empty}>No users have taken your subscription yet.</p>
      ) : (
        <div style={styles.list}>
          {subscriptions.map((sub) => (
            <div key={sub.subscriptionId} style={styles.card}>
              
              {/* ------------ USER DETAILS COLUMN ------------ */}
              <div style={styles.column}>
                <h3 style={styles.colTitle}>User Details</h3>
                <p style={styles.item}><strong>Name:</strong> {sub.user.name}</p>
                <p style={styles.item}><strong>Email:</strong> {sub.user.email}</p>
                <p style={styles.item}><strong>Phone:</strong> {sub.user.phone}</p>
                <p style={styles.item}><strong>Address:</strong> {sub.user.address}</p>
              </div>

              {/* ------------ PLAN DETAILS COLUMN ------------ */}
              <div style={styles.column}>
                <h3 style={styles.colTitle}>Plan Details</h3>
                <p style={styles.item}><strong>Plan:</strong> {sub.plan.name}</p>
                <p style={styles.item}><strong>Duration:</strong> {sub.plan.durationDays} days</p>
                <p style={styles.item}><strong>Meal Type:</strong> {sub.plan.mealType}</p>
                <p style={styles.item}><strong>Price/Day:</strong> ₹{sub.plan.pricePerDay}</p>
              </div>

              {/* ------------ SUBSCRIPTION DETAILS COLUMN ------------ */}
              <div style={styles.column}>
                <h3 style={styles.colTitle}>Subscription Details</h3>
                <p style={styles.item}><strong>Start Date:</strong> {sub.startDate}</p>
                <p style={styles.item}><strong>End Date:</strong> {sub.endDate}</p>
                <p style={styles.item}><strong>Status:</strong> {sub.status}</p>
                <p style={styles.item}><strong>Total Amount:</strong> ₹{sub.totalAmount}</p>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}


// --------------------- BEAUTIFUL STYLES ---------------------
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif"
  },

  heading: {
    textAlign: "center",
    marginBottom: "25px",
    color: "#222",
    fontSize: "26px",
    fontWeight: "bold",
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  card: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "20px",
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
  },

  column: {
    background: "#f8f8f8",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "inset 0 0 5px rgba(0,0,0,0.05)",
  },

  colTitle: {
    fontSize: "18px",
    marginBottom: "10px",
    color: "#333",
    borderBottom: "2px solid #ccc",
    paddingBottom: "5px",
  },

  item: {
    fontSize: "14px",
    margin: "5px 0",
    color: "#444",
  },

  loading: {
    textAlign: "center",
    marginTop: "40px",
    fontSize: "18px",
  },

  empty: {
    textAlign: "center",
    color: "#888",
    fontSize: "16px",
  },
};
