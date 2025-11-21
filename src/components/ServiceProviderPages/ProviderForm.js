import { useState, useEffect } from "react";

function ProviderForm({ userData }) {
  const [formData, setFormData] = useState({
    provider: { userId: userData.userId },
    businessName: "",
    businessAddress: "",
    contactNumber: "",
    email: "",
    fssaiLicenseNumber: "",
    gstNumber: ""
  });

  const [isInfoSet, setIsInfoSet] = useState(false);

useEffect(() => {
  const fetchProviderInfo = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/providers-info/by-provider/${userData.userId}`
      );

      if (res.ok) {
        const data = await res.json();
        if (data && data.businessName) {
          setFormData(data);
          setIsInfoSet(true);
        }
      }
    } catch (error) {
      console.error("Error fetching provider info:", error);
    }
  };

  fetchProviderInfo();
}, [userData.userId]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/providers-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Provider info saved successfully!");
        setIsInfoSet(true); // Hide form after save
      } else {
        alert("Error saving provider info");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Network error occurred");
    }
  };

  if (isInfoSet) {
    return (
      <div className="">
        <h2 className="">Provider Information</h2><hr/>
        <p><strong>Business Name:</strong> {formData.businessName}</p>
        <p><strong>Address:</strong> {formData.businessAddress}</p>
        <p><strong>Contact:</strong> {formData.contactNumber}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>FSSAI License:</strong> {formData.fssaiLicenseNumber}</p>
        <p><strong>GST:</strong> {formData.gstNumber}</p>
        <button
          onClick={() => setIsInfoSet(false)}
          className=""
        >
          Edit Info
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="">
      <h2 className="">Add Provider Information</h2>

      <input
        type="text"
        name="businessName"
        placeholder="Business Name"
        value={formData.businessName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="businessAddress"
        placeholder="Business Address"
        value={formData.businessAddress}
        onChange={handleChange}
      />
      <input
        type="text"
        name="contactNumber"
        placeholder="Contact Number"
        value={formData.contactNumber}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="text"
        name="fssaiLicenseNumber"
        placeholder="FSSAI License Number"
        value={formData.fssaiLicenseNumber}
        onChange={handleChange}
      />
      <input
        type="text"
        name="gstNumber"
        placeholder="GST Number"
        value={formData.gstNumber}
        onChange={handleChange}
      />

      <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
        Save Provider Info
      </button>
    </form>
  );
}

export default ProviderForm;
