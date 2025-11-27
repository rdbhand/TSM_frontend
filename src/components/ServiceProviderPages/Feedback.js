import { useEffect, useState } from "react";

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const provider = JSON.parse(sessionStorage.getItem("userData"));
  const providerId = provider?.userId;

  useEffect(() => {
    if (!providerId) return;

    const fetchFeedback = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/feedback/provider/${providerId}`
        );
        const data = await res.json();
        setFeedbacks(data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [providerId]);

  if (loading)
    return <h3 style={{ textAlign: "center" }}>Loading feedback...</h3>;

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>Feedback Received</h2>

      {feedbacks.length === 0 ? (
        <p style={styles.noData}>No feedback available.</p>
      ) : (
        feedbacks.map((fb) => (
          <div key={fb.feedbackId} style={styles.card}>
            {/* ---------- USER DETAILS ---------- */}
            <div style={styles.column}>
              <h4 style={styles.title}>User</h4>
              <p>
                <strong>Name:</strong> {fb.subscription.user.name}
              </p>
              <p>
                <strong>Email:</strong> {fb.subscription.user.email}
              </p>
              <p>
                <strong>Phone:</strong> {fb.subscription.user.phone}
              </p>
            </div>

            {/* ---------- PLAN DETAILS ---------- */}
            <div style={styles.column}>
              <h4 style={styles.title}>Plan</h4>
              <p>
                <strong>Name:</strong> {fb.subscription.plan.name}
              </p>
              <p>
                <strong>Meal:</strong> {fb.subscription.plan.mealType}
              </p>
              <p>
                <strong>Price/day:</strong> ₹{fb.subscription.plan.pricePerDay}
              </p>
              <p>
                <strong>Duration:</strong> {fb.subscription.plan.durationDays}{" "}
                days
              </p>
            </div>

            {/* ---------- FEEDBACK DETAILS ---------- */}
            <div style={styles.column}>
              <h4 style={styles.title}>Feedback</h4>
              <p>
                <strong>Rating:</strong> ⭐ {fb.rating}/5
              </p>
              <p>
                <strong>Message:</strong> {fb.feedbackText}
              </p>
              <p>
                <strong>Date:</strong> {fb.createdAt?.substring(0, 10)}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

// -------------------- INLINE STYLES --------------------
const styles = {
  wrapper: {
    width: "90%",
    maxWidth: "1100px",
    margin: "20px auto",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
  },
  noData: {
    textAlign: "center",
    padding: "20px",
    background: "#f8d7da",
    color: "#721c24",
    borderRadius: "8px",
  },
  card: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "20px",
    background: "#fff",
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  column: {
    padding: "10px",
    borderLeft: "3px solid #4caf50",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
  },
  title: {
    fontSize: "18px",
    marginBottom: "10px",
    color: "#4caf50",
    fontWeight: "bold",
  },
};
