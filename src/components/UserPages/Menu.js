const Menu = ({ userData }) => {
  return (
    <div>
      <h2>Today’s Menu</h2>
      <p>Check out what’s being served today, {userData?.name || "friend"}.</p>
    </div>
  );
};

export default Menu;
