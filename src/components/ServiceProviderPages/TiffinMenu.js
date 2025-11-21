import React, { useEffect, useState } from "react";

export default function TiffinMenu() {
  const providerId = JSON.parse(sessionStorage.getItem("userData")).userId;
  const [menu, setMenu] = useState({
    providerId: providerId,
    mondayLunch: "",
    mondayDinner: "",
    tuesdayLunch: "",
    tuesdayDinner: "",
    wednesdayLunch: "",
    wednesdayDinner: "",
    thursdayLunch: "",
    thursdayDinner: "",
    fridayLunch: "",
    fridayDinner: "",
    saturdayLunch: "",
    saturdayDinner: "",
    sundayLunch: "",
    sundayDinner: "",
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch existing tiffin menu for this provider
  useEffect(() => {
    fetch(`http://localhost:8080/api/tiffin-menu/${providerId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setMenu(data);
        }
      })
      .catch((err) => console.error("Error loading menu:", err))
      .finally(() => setLoading(false));
  }, [providerId]);

  // Handle input change
  const handleChange = (e) => {
    setMenu({ ...menu, [e.target.name]: e.target.value });
  };

  // Save or Update Menu
  const handleSave = () => {
    fetch("http://localhost:8080/api/tiffin-menu/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(menu),
    })
      .then((res) => res.json())
      .then(() => setMessage("Menu saved successfully!"))
      .catch(() => setMessage("Error saving menu."));
  };

  if (loading) return <p>Loading menu...</p>;

  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Weekly Tiffin Menu</h2>

      {message && <p style={styles.message}>{message}</p>}

      <div style={styles.table}>
        {days.map((day) => (
          <div key={day} style={styles.row}>
            <div style={styles.dayCol}>{day.toUpperCase()}</div>

            <input
              type="text"
              name={`${day}Lunch`}
              placeholder="Lunch"
              value={menu[`${day}Lunch`] || ""}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              type="text"
              name={`${day}Dinner`}
              placeholder="Dinner"
              value={menu[`${day}Dinner`] || ""}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
        ))}

        <button onClick={handleSave} style={styles.button}>Save Menu</button>
      </div>
    </div>
  );
}

/* ---------- Internal CSS Styles ---------- */
const styles = {
  container: {
    margin: "30px auto",
    maxWidth: "700px",
    padding: "20px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    fontFamily: "Arial",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  table: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr 2fr",
    gap: "10px",
    alignItems: "center",
  },
  dayCol: {
    fontWeight: "bold",
    fontSize: "14px",
  },
  input: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    marginTop: "20px",
    padding: "12px 20px",
    background: "#0d6efd",
    border: "none",
    color: "white",
    cursor: "pointer",
    borderRadius: "6px",
    fontSize: "16px",
  },
  message: {
    textAlign: "center",
    color: "green",
    marginBottom: "10px",
  },
};
