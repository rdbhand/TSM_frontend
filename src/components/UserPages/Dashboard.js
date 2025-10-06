import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // if using react-router for navigation
import '../../styles/UDashboard.css'
const Dashboard = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // for navigation to tiffin plans page

  useEffect(() => {
    const fetchAllProviders = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/providers-info");
        if (res.ok) {
          const data = await res.json();
          setProviders(data);
        } else {
          throw new Error("Failed to fetch provider data");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching provider data from database");
      } finally {
        setLoading(false);
      }
    };

    fetchAllProviders();
  }, []);

  const handleViewTiffinPlans = (providerId) => {
    // Navigate to a tiffin plans page for this provider
    navigate(`/tiffin-plans/${providerId}`);
  };

  return (
    <div>
      <h2>Service Providers Dashboard</h2>
      <p>Below is a list of all tiffin service providers.</p>

      {loading && <p>Loading providers...</p>}
      {error && <p>{error}</p>}

      {!loading && providers.length === 0 && (
        <p>No service providers found in the database.</p>
      )}

      {!loading && providers.length > 0 && (
        <div className="provider-list">
          <hr/>
          {providers.map((provider) => (
            <div
              key={provider.id}
              className="provider-card"
            >
              <div>
                <p><strong>Tiffin Service Name:</strong> {provider.businessName}</p>
                <p><strong>Tiffin Service Address:</strong> {provider.businessAddress}</p>
                <p><strong>Contact Number:</strong> {provider.contactNumber}</p>
                <p><strong>Email:</strong> {provider.email}</p>
                <p><strong>FSSAI License:</strong> {provider.fssaiLicenseNumber}</p>
                <p><strong>GST Number:</strong> {provider.gstNumber}</p>
              </div>
              
              {/* ✅ Button to view tiffin plans */}
              <button
                onClick={() => handleViewTiffinPlans(provider.id)}
              >
                View Tiffin Plans
              </button>
              <hr/>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
