const Notifications = ({ userData }) => {
  return (
    <div>
      <h2>Notifications</h2>
      <p>Here are your recent notifications, {userData?.name || "friend"}.</p>
    </div>
  );
};

export default Notifications;
