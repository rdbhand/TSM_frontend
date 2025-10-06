const Feedback = ({ userData }) => {
  return (
    <div>
      <h2>Feedback</h2>
      <p>We value your feedback, {userData?.name || "friend"}. Please share your thoughts with us!</p>
    </div>
  );
};

export default Feedback;
