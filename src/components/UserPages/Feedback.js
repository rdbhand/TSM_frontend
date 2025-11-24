import { useState } from "react";

export default function Feedback() {
  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [selectedSubscription, setSelectedSubscription] = useState("");

  // ------------------- LOAD DATA FROM SESSION STORAGE -------------------
  const user = JSON.parse(sessionStorage.getItem("userData")); // { id, name, email, ... }

  // ------------------- FETCH SUBSCRIPTIONS OF USER ----------------------
  const subscriptions=(JSON.parse(sessionStorage.getItem("subscription")) || []);

  // ------------------------- SUBMIT FEEDBACK ---------------------------
  const submitFeedback = async (e) => {
    e.preventDefault();

    const payload = {
      userId: user.userId,
      feedbackText,
      rating,
      subscriptionId: selectedSubscription,
    };

    try {
      const response = await fetch("http://localhost:8080/api/feedback/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setMessage("Feedback submitted successfully!");
        setFeedbackText("");
        setRating(5);
      } else {
        setMessage("Failed to submit feedback.");
      }
    } catch (error) {
      setMessage("Server error: " + error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Feedback</h2>

      <p style={styles.subText}>
        We value your feedback, <strong>{user?.name || "friend"}</strong>.
        Please share your thoughts with us!
      </p>

      {/* ------------------------ SUBSCRIPTION SELECT BOX ------------------------ */}
      <label style={styles.label}>Select Subscription:</label>
      <select
        value={selectedSubscription}
        onChange={(e) => setSelectedSubscription(e.target.value)}
        style={styles.select}
      >
        {subscriptions.length === 0 && <option>No active subscriptions</option>}

        {subscriptions.map((sub) => (
          <option key={sub.subscriptionId} value={sub.subscriptionId}>
            {sub.plan.provider.name} — {sub.startDate} to {sub.endDate}
          </option>
        ))}
      </select>
        
      <form onSubmit={submitFeedback} style={styles.form}>
        {/* ------------------------ RATING ------------------------ */}
        <label style={styles.label}>Rating:</label>
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          style={styles.select}
        >
          <option value={1}>1 - Poor</option>
          <option value={2}>2 - Average</option>
          <option value={3}>3 - Good</option>
          <option value={4}>4 - Very Good</option>
          <option value={5}>5 - Excellent</option>
        </select>

        {/* ------------------------ FEEDBACK TEXT ------------------------ */}
        <label style={styles.label}>Your Feedback:</label>
        <textarea
          placeholder="Write your feedback..."
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          required
          style={styles.textarea}
        />

        <button type="submit" style={styles.button}>
          Submit Feedback
        </button>
      </form>

      {message && <p style={styles.msg}>{message}</p>}
    </div>
  );
}

// ------------------ STYLES (Same File) --------------------
const styles = {
  container: {
    width: "90%",
    maxWidth: "500px",
    margin: "20px auto",
    padding: "20px",
    borderRadius: "12px",
    backgroundColor: "#ffffff",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
    color: "#333",
  },
  subText: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  label: {
    fontWeight: "bold",
    color: "#444",
  },
  select: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  textarea: {
    minHeight: "100px",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    resize: "vertical",
    fontSize: "14px",
  },
  button: {
    marginTop: "12px",
    padding: "12px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "0.3s",
  },
  msg: {
    marginTop: "15px",
    fontWeight: "bold",
    color: "green",
    textAlign: "center",
  },
};
