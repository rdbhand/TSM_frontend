import { useState, useEffect } from "react";

export default function PlanForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration_days: "",
    meal_type: "BOTH",
    price_per_day: "",
    is_active: true,
  });

  const userData = JSON.parse(sessionStorage.getItem("userData"));
  
  const [plans, setPlans] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const loadPlans = () => {
    fetch(`http://localhost:8080/api/plans?providerId=${userData.userId}`)
      .then((res) => res.json())
    
      .then((data) => {
  console.log("Fetched plans =", data);
  setPlans(data);
})

      .catch((err) => console.error("Error loading plans", err));
  };

  useEffect(() => {
    loadPlans();
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      name: formData.name,
      description: formData.description,
      durationDays: Number(formData.duration_days),
      mealType: formData.meal_type,
      pricePerDay: Number(formData.price_per_day),
      isActive: formData.is_active,
      provider: { userId: userData.userId },
    };

    const res = await fetch("http://localhost:8080/api/plans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend),
    });

    if (res.ok) {
      alert("Plan added successfully!");
      loadPlans(); // Refresh list
    } else {
      alert("Error adding plan");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="p-4 space-y-3">
        {/* Inputs unchanged */}
        <input
          type="text"
          name="name"
          placeholder="Plan Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          type="number"
          min="1"
          name="duration_days"
          placeholder="Duration (Days)"
          value={formData.duration_days}
          onChange={handleChange}
          required
        />

        <select
          name="meal_type"
          value={formData.meal_type}
          onChange={handleChange}
        >
          <option value="BOTH">Both</option>
          <option value="LUNCH">Lunch</option>
          <option value="DINNER">Dinner</option>
        </select>

        <input
          type="number"
          step="0.01"
          name="price_per_day"
          placeholder="Price per Day"
          value={formData.price_per_day}
          onChange={handleChange}
          required
        />

        <label>
          <input
            type="checkbox"
            name="is_active"
            checked={formData.is_active}
            onChange={handleChange}
          />
          Active
        </label>

        <button type="submit">Add Plan</button>
      </form>

      {/* Display Existing Plans */}
      <h2 className="mt-4">Existing Plans</h2>

      {plans.length === 0 ? (
        <p>No plans created yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
  {plans.map((p) => (
    <li
      key={p.id}
      style={{
        marginBottom: "16px",
        padding: "12px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#fafafa",
      }}
    >
      <h3 style={{ margin: 0, marginBottom: "6px", color: "#333" }}>
        {p.name}
      </h3>

      <p style={{ margin: "4px 0" }}>
        <strong>Description:</strong> {p.description}
      </p>

      <p style={{ margin: "4px 0" }}>
        <strong>Duration:</strong> {p.durationDays} days
      </p>

      <p style={{ margin: "4px 0" }}>
        <strong>Meal Type:</strong> {p.mealType}
      </p>

      <p style={{ margin: "4px 0" }}>
        <strong>Price:</strong> ₹{p.pricePerDay} / day
      </p>

      <p style={{ margin: "4px 0" }}>
        <strong>Status:</strong>{" "}
        <span style={{ color: p.active ? "green" : "red" }}>
          {p.active ? "Active" : "Inactive"}
        </span>
      </p>
    </li>
  ))}
</ul>

      )}
    </>
  );
}
