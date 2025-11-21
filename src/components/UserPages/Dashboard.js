import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/UDashboard.css";

const Dashboard = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [visiblePlans, setVisiblePlans] = useState({});
  const [plansByProvider, setPlansByProvider] = useState({});
  const [subscribingPlan, setSubscribingPlan] = useState(null); // 👈 To disable button while subscribing

  const navigate = useNavigate();

  // Get logged-in userId (from localStorage)
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const userId= userData ? userData.userId : null;

  useEffect(() => {
    const fetchAllProviders = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/providers-info");
        if (!res.ok) throw new Error("Failed to fetch provider data");

        const data = await res.json();
        setProviders(data);
      } catch (err) {
        console.error(err);
        setError("Error fetching provider data from database");
      } finally {
        setLoading(false);
      }
    };

    fetchAllProviders();
  }, []);

  const handleViewTiffinPlans = async (providerId) => {
    setVisiblePlans((prev) => ({
      ...prev,
      [providerId]: !prev[providerId],
    }));

    if (plansByProvider[providerId]) return;

    try {
      const res = await fetch(
        `http://localhost:8080/api/plans?providerId=${providerId}`
      );
      if (!res.ok) throw new Error("Failed to fetch tiffin plans");

      const plans = await res.json();

      setPlansByProvider((prev) => ({
        ...prev,
        [providerId]: plans,
      }));
    } catch (err) {
      console.error(err);
      setPlansByProvider((prev) => ({
        ...prev,
        [providerId]: [],
      }));
    }
  };

  // ⭐ GET PLAN / SUBSCRIBE PLAN
  const handleGetPlan = async (planId) => {
    if (!userId) {
      alert("You must be logged in to subscribe!");
      navigate("/reglogin");
      return;
    }

    setSubscribingPlan(planId);

    try {
      const res = await fetch("http://localhost:8080/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: Number(userId),
          planId: Number(planId),
        }),
      });

      if (!res.ok) throw new Error("Failed to subscribe");

      const result = await res.json();

      alert("Subscription successful!");

      // Optional redirect
      // navigate("/my-subscriptions");

    } catch (err) {
      console.error(err);
      alert("Failed to subscribe. Please try again.");
    } finally {
      setSubscribingPlan(null);
    }
  };

  return (
    <div className="provider-list-container">
      {loading && <p>Loading providers...</p>}
      {error && <p>{error}</p>}

      {!loading && providers.length === 0 && (
        <p>No service providers found.</p>
      )}

      {!loading &&
        providers.map((provider) => (
          <div key={provider.provider.userId} className="provider-card">
            <p>
              <strong>Tiffin Service Name:</strong> {provider.businessName}
            </p>
            <p>
              <strong>Address:</strong> {provider.businessAddress}
            </p>
            <p>
              <strong>Contact:</strong> {provider.contactNumber}
            </p>
            <p>
              <strong>Email:</strong> {provider.email}
            </p>
            <p>
              <strong>FSSAI:</strong> {provider.fssaiLicenseNumber}
            </p>
            <p>
              <strong>GST:</strong> {provider.gstNumber}
            </p>

            <button
              onClick={() =>
                handleViewTiffinPlans(provider.provider.userId)
              }
            >
              {visiblePlans[provider.provider.userId]
                ? "Hide Plans"
                : "View Plans"}
            </button>

            {visiblePlans[provider.provider.userId] && (
              <div className="tiffin-plans">
                {!plansByProvider[provider.provider.userId] ? (
                  <p>Loading plans...</p>
                ) : plansByProvider[provider.provider.userId].length === 0 ? (
                  <p>No plans available.</p>
                ) : (
                  plansByProvider[provider.provider.userId].map((plan) => (
                    <div key={plan.planId} className="tiffin-plan-card">
                      <p>
                        <strong>Name:</strong> {plan.name}
                      </p>
                      <p>
                        <strong>Description:</strong> {plan.description}
                      </p>
                      <p>
                        <strong>Duration:</strong> {plan.durationDays} days
                      </p>
                      <p>
                        <strong>Meal Type:</strong> {plan.mealType}
                      </p>
                      <p>
                        <strong>Price/Day:</strong> ₹{plan.pricePerDay}
                      </p>
                      <p>
                        <strong>Status:</strong>{" "}
                        {plan.isActive ? "Active" : "Inactive"}
                      </p>

                      <button
                        className="getplan-btn"
                        onClick={() => handleGetPlan(plan.planId)}
                        disabled={subscribingPlan === plan.planId}
                      >
                        {subscribingPlan === plan.planId
                          ? "Subscribing..."
                          : "Get Plan"}
                      </button>

                      <hr />
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default Dashboard;
