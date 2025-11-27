import { useState, useEffect } from "react";

export default function Analytics() {
  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("info");

  // Fetch notifications of provider (providerId from session)
  const provider = JSON.parse(sessionStorage.getItem("userData"));
  const providerId = provider?.userId;

  useEffect(() => {
    fetch(`http://localhost:8080/api/notifications/provider/${providerId}`)
      .then((res) => res.json())
      .then((data) => setNotifications(Array.isArray(data) ? data : [data]))
      .catch(() => console.log("Error loading notifications"));
  }, [providerId]);

  const sendNotification = async (e) => {
    e.preventDefault();

    const payload = {
      message,
      type,
      providerId,
    };

    const response = await fetch(
      "http://localhost:8080/api/notifications/create",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (response.ok) {
      const saved = await response.json();
      setNotifications([saved, ...notifications]);

      setMessage("");
      setType("info");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Notifications & Analytics</h2>

      {/* Create Notification */}
      <form onSubmit={sendNotification} style={styles.form}>
        <label style={styles.label}>Notification Message</label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={styles.input}
          required
        />

        <label style={styles.label}>Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={styles.input}
        >
          <option value="info">Info</option>
          <option value="success">Success</option>
          <option value="warning">Warning</option>
          <option value="alert">Alert</option>
        </select>

        <button type="submit" style={styles.button}>
          Send Notification
        </button>
      </form>

      {/* Notification List */}
      <h3 style={{ marginTop: "20px" }}>Recent Notifications</h3>

      <div style={styles.list}>
        {notifications.map((n) => (
          <div
            key={n.id}
            style={{
              ...styles.notification,
              borderLeft: `5px solid ${
                n.type === "success"
                  ? "green"
                  : n.type === "warning"
                  ? "orange"
                  : n.type === "alert"
                  ? "red"
                  : "blue"
              }`,
            }}
          >
            <p>{n.message}</p>
            <small style={{ color: "#777" }}>
              {new Date(n.createdAt).toLocaleString()}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- INTERNAL CSS ----------
const styles = {
  container: {
    width: "90%",
    maxWidth: "600px",
    margin: "20px auto",
    padding: "20px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    fontFamily: "Arial",
  },
  heading: {
    textAlign: "center",
    marginBottom: "15px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "15px",
    background: "#f9f9f9",
    borderRadius: "8px",
  },
  label: {
    fontWeight: "bold",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  list: {
    marginTop: "10px",
    maxHeight: "250px",
    overflowY: "auto",
  },
  notification: {
    padding: "12px",
    background: "#fafafa",
    borderRadius: "6px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    marginBottom: "10px",
  },
};
