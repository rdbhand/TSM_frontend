import { useState } from "react";

export default function PlanForm({ providerId }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration_days: "",
    meal_type: "BOTH",
    price_per_day: "",
    is_active: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = { ...formData, provider_id: providerId };
    const res = await fetch("http://localhost:5000/api/plans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend),
    });
    if (res.ok) alert("Plan added successfully!");
    else alert("Error adding plan");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-3">
      <input type="text" name="name" placeholder="Plan Name" value={formData.name} onChange={handleChange} required />
      <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
      <input type="number" min="1" name="duration_days" placeholder="Duration (Days)" value={formData.duration_days} onChange={handleChange} required />
      <br/>
      <br/>
      <select name="meal_type" value={formData.meal_type} onChange={handleChange}>
        <option value="BOTH">Both</option>
        <option value="LUNCH">Lunch</option>
        <option value="DINNER">Dinner</option>
      </select>
      <br/>
      <br/>
      <input type="number" step="0.01" name="price_per_day" placeholder="Price per Day" value={formData.price_per_day} onChange={handleChange} required />
      <br/>
      <br/>
      <label>
        <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} />
        Active
      </label>
      <button type="submit">Add Plan</button>
    </form>
  );
}
