import { useState, useEffect } from "react";

export default function Payment() {
  const user = JSON.parse(sessionStorage.getItem("userData")); // user from sessionStorage
  const subscriptions = JSON.parse(sessionStorage.getItem("subscription")) || [];

  const [amount, setAmount] = useState(""); // user enters amount
  const [selectedSubscription, setSelectedSubscription] = useState("");
  const [message, setMessage] = useState("");

  // Auto-select first subscription when available
  useEffect(() => {
    if (subscriptions.length > 0) {
      setSelectedSubscription(subscriptions[0].subscriptionId);
    }
  }, [subscriptions]);

  // ------------------ START RAZORPAY PAYMENT ------------------
  const startPayment = async () => {
    if (!amount || amount <= 0) {
      setMessage("Enter a valid amount.");
      return;
    }

    try {
      // 1️⃣ CREATE ORDER FROM BACKEND
      const orderResponse = await fetch(
        "http://localhost:8080/api/payment/create-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: amount * 100, // Razorpay works in paise
            subscriptionId: selectedSubscription,
            userId: user?.userId,
          }),
        }
      );

      const order = await orderResponse.json();

      if (!order || !order.id) {
        setMessage("Order creation failed.");
        return;
      }

      // 2️⃣ OPEN RAZORPAY PAYMENT WINDOW
      const options = {
        key: "rzp_test_xxxxxxxxxxx", // Replace with your Razorpay test key
        amount: order.amount,
        currency: "INR",
        name: "Tiffin Service",
        description: "Subscription Payment",
        order_id: order.id,
        handler: async function (response) {
          // 3️⃣ VERIFY PAYMENT ON BACKEND
          const verifyRes = await fetch(
            "http://localhost:8080/api/payment/verify",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                subscriptionId: selectedSubscription,
                userId: user?.userId,
                amount: amount,
              }),
            }
          );

          if (verifyRes.ok) {
            setMessage("Payment Successful!");
          } else {
            setMessage("Payment verification failed.");
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email,
        },
        theme: {
          color: "#1976d2",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      setMessage("Payment error: " + err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Payment</h2>
      <p style={styles.text}>
        Manage your payments, <strong>{user?.name || "friend"}</strong>.
      </p>

      <label style={styles.label}>Select Subscription:</label>
      <select
        style={styles.select}
        value={selectedSubscription}
        onChange={(e) => setSelectedSubscription(e.target.value)}
      >
        {subscriptions.map((sub) => (
          <option key={sub.subscriptionId} value={sub.subscriptionId}>
            {sub?.plan?.provider?.name || "Provider"} — {sub.startDate} to{" "}
            {sub.endDate}
          </option>
        ))}
      </select>

      <label style={styles.label}>Enter Amount (₹):</label>
      <input
        type="number"
        style={styles.input}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />

      <button onClick={startPayment} style={styles.button}>
        Pay Now
      </button>

      {message && <p style={styles.msg}>{message}</p>}
    </div>
  );
}

// ------------------- STYLES -------------------
const styles = {
  container: {
    width: "90%",
    maxWidth: "480px",
    margin: "30px auto",
    padding: "20px",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    fontFamily: "Arial",
  },
  heading: { textAlign: "center", color: "#333" },
  text: { marginBottom: "15px", color: "#555" },
  label: {
    fontWeight: "bold",
    marginTop: "10px",
    display: "block",
    color: "#444",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginBottom: "10px",
  },
  select: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
    marginBottom: "10px",
  },
  button: {
    width: "100%",
    background: "#1976d2",
    color: "#fff",
    padding: "12px",
    fontSize: "16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px",
  },
  msg: {
    marginTop: "15px",
    textAlign: "center",
    fontWeight: "bold",
    color: "green",
  },
};
