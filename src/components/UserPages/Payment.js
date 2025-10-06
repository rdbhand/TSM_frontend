const Payment = ({ userData }) => {
  return (
    <div>
      <h2>Payment</h2>
      <p>Manage your payment methods and view transaction history, {userData?.name || "friend"}.</p>
    </div>
  );
};

export default Payment;
