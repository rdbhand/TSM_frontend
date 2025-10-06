const Subscription = ({ userData }) => {
  return (
    <div>
      <h2>My Subscription</h2>
      <p>Manage your subscription details and preferences here, {userData?.name || "friend"}.</p>
    </div>
  );
};

export default Subscription;
