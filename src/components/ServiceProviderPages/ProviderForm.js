import { useState, useEffect } from "react";

function ProviderForm() {
  const userData = JSON.parse(sessionStorage.getItem("userData"));

  const [formData, setFormData] = useState({
    provider: { userId: userData.userId },
    businessName: "",
    businessAddress: "",
    contactNumber: "",
    email: "",
    fssaiLicenseNumber: "",
    gstNumber: "",
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
        setIsInfoSet(true);
      } else {
        alert("Error saving provider info");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Network error occurred");
    }
  };

  return (
    <>
      {/* ---------------- INTERNAL CSS ---------------- */}
      <style>
        {`
          .provider-container, .provider-info {
            max-width: 500px;
            margin: 20px auto;
            padding: 20px;
            border-radius: 12px;
            background: #ffffff;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            font-family: Arial, sans-serif;
          }

          .provider-container h2, .provider-info h2 {
            text-align: center;
            color: #333;
            margin-bottom: 15px;
          }

          .provider-container input {
            width: 100%;
            padding: 10px;
            margin: 8px 0;
            border: 1px solid #ccc;
            border-radius: 6px;
            font-size: 14px;
            transition: 0.3s;
          }

          .provider-container input:focus {
            border-color: #4caf50;
            outline: none;
            box-shadow: 0 0 4px rgba(76,175,80,0.4);
          }

          .save-btn {
            margin-top: 10px;
            width: 100%;
            padding: 12px;
            background: #4caf50;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            cursor: pointer;
            transition: 0.3s;
          }

          .save-btn:hover {
            background: #43a047;
          }

          .provider-info p {
            font-size: 15px;
            margin: 6px 0;
          }

          .edit-btn {
            margin-top: 15px;
            padding: 10px 15px;
            background: #ff9800;
            border: none;
            border-radius: 8px;
            color: white;
            cursor: pointer;
            font-size: 15px;
            display: block;
            width: 100%;
            transition: 0.3s;
          }

          .edit-btn:hover {
            background: #fb8c00;
          }
        `}
      </style>

      {/* ---------------- SHOW PROVIDER INFO ---------------- */}
      {isInfoSet ? (
        <div className="provider-info">
          <h2>Provider Information</h2>
          <hr />
          <p><strong>Business Name:</strong> {formData.businessName}</p>
          <p><strong>Address:</strong> {formData.businessAddress}</p>
          <p><strong>Contact:</strong> {formData.contactNumber}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>FSSAI License:</strong> {formData.fssaiLicenseNumber}</p>
          <p><strong>GST:</strong> {formData.gstNumber}</p>

          <button
            onClick={() => setIsInfoSet(false)}
            className="edit-btn"
          >
            Edit Info
          </button>
        </div>
      ) : (
        /* ---------------- FORM ---------------- */
        <form onSubmit={handleSubmit} className="provider-container">
          <h2>Add Provider Information</h2>

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

          <button type="submit" className="save-btn">
            Save Provider Info
          </button>
        </form>
      )}
    </>
  );
}

export default ProviderForm;
