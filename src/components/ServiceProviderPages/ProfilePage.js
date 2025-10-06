import { useState, useEffect } from "react";

export default function ProfilePage({ userId }) {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    role: "",
  });

  // Fetch profile on page load
  useEffect(() => {
    async function fetchProfile() {
      const res = await fetch(`http://localhost:5000/api/users/${userId}`);
      const data = await res.json();
      setProfile({ ...data, password: "" }); // don't prefill password
    }
    fetchProfile();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = { ...profile };
    if (!updatedData.password) delete updatedData.password; // don't update password if blank

    const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (res.ok) alert("Profile updated successfully!");
    else alert("Error updating profile");
  };

  return (
    <div>
      <h2>Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={profile.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={profile.email}
          disabled
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={profile.phone}
          onChange={handleChange}
        />
        <textarea
          name="address"
          placeholder="Address"
          value={profile.address}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="New Password (leave blank if unchanged)"
          value={profile.password}
          onChange={handleChange}
        />
        <select name="role" value={profile.role} disabled>
          <option value="user">User</option>
          <option value="serviceProvider">Service Provider</option>
        </select>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}
