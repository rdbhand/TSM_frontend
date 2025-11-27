import { useEffect, useState } from "react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData=JSON.parse(sessionStorage.getItem("userData"));
  const subscription=JSON.parse(sessionStorage.getItem("subscription"));
  const providerIdList=[];
  useEffect(() => {
    if (!userData?.userId) return;
    for(let i=0;i<subscription.length;i++){
      if(subscription[i].userId===userData.userId){
        providerIdList.push(subscription[i].plan.provider.userId);
      }
    }
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/notifications/user/${userData.userId}`
        );

        const data = await response.json();

        if (Array.isArray(data)) {
          setNotifications(data);
        } else {
          setNotifications([]);
          console.error("API did not return an array:", data);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  });


  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Notifications</h2>
      <p style={styles.greeting}>
        Here are your recent notifications, {userData?.name || "friend"}.
      </p>

      {loading ? (
        <p style={styles.loading}>Loading notifications...</p>
      ) : notifications.length === 0 ? (
        <p style={styles.empty}>No notifications available.</p>
      ) : (
        <ul style={styles.list}>
          {notifications.map((note, index) => (
            <li key={index} style={styles.item}>
              <p style={styles.message}>{note.message}</p>
              <span style={styles.time}>
                {note.time || note.createdAt || ""}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    padding: "20px",
    maxWidth: "600px",
    margin: "auto",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)"
  },
  title: {
    marginBottom: "10px",
    fontSize: "26px",
    fontWeight: "bold"
  },
  greeting: {
    marginBottom: "20px",
    color: "#555"
  },
  loading: {
    color: "blue"
  },
  empty: {
    color: "#777"
  },
  list: {
    listStyle: "none",
    padding: 0
  },
  item: {
    padding: "12px",
    borderBottom: "1px solid #ececec"
  },
  message: {
    fontSize: "16px"
  },
  time: {
    fontSize: "12px",
    color: "#999"
  }
};

export default Notifications;
