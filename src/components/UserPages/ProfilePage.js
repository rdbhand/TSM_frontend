import { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
export default function ProfilePage() {
 const [userData] = useState(() => {
  return sessionStorage.getItem("userData")
    ? JSON.parse(sessionStorage.getItem("userData"))
    : null;
});

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
    console.log("User data in ProfilePage:", userData);
    if (!userData || !userData.userId) return; // Prevent undefined error

    async function fetchProfile() {
      try {
        const res = await fetch(
          `http://localhost:8080/api/user?id=${userData.userId}`
        );
        if (!res.ok) throw new Error("Failed to load profile");

        const data = await res.json();
        console.log("Fetched profile data:", data);
        setProfile({ ...data, password: "" }); // Do not show password
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    }

    fetchProfile();
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = { ...profile };
    if (!updatedData.password) delete updatedData.password;

    try {
      const res = await fetch(
        `http://localhost:8080/api/users?id=${userData.userId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );

      if (res.ok) {
        alert("Profile updated successfully!");
      } else {
        alert("Error updating profile");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Server error");
    }
  };

  return (
    <div>
      <h2 style={{textAlign: "center"}}>My Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <strong>Name :</strong> 
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={profile.name}
          onChange={handleChange}
          required
        />
          <strong>Email :</strong> 
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={profile.email}
          readOnly // replaced disabled
        />
          <strong> Phone :</strong>
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={profile.phone}
          onChange={handleChange}
        />
          <strong>Address :</strong> <br/>
        <textarea
          name="address"
          placeholder="Address"
          value={profile.address}
          onChange={handleChange}
        /><br/>
          <strong>Password :</strong>
        <input
          type="password"
          name="password"
          placeholder="New Password (leave blank if unchanged)"
          value={profile.password}
          onChange={handleChange}
        />
          <strong>Role :</strong>
        <input type="text" name="role" value={profile.role} readOnly/>
        <br/> <br/>
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Update Profile
        </button>
      </form>
    </div>
  );
}
