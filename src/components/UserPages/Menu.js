import { useEffect, useState } from "react";

export default function Menu() {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  // Read all subscriptions and fetch menu for each provider
  useEffect(() => {
    const storedSubs = sessionStorage.getItem("subscription");

    if (!storedSubs) {
      console.warn("No subscription data found.");
      setLoading(false);
      return;
    }

    let subscriptions = [];

    try {
      subscriptions = JSON.parse(storedSubs);
    } catch (err) {
      console.error("Error parsing subscription JSON.", err);
      setLoading(false);
      return;
    }

    if (!Array.isArray(subscriptions) || subscriptions.length === 0) {
      console.warn("Subscription array empty.");
      setLoading(false);
      return;
    }

    const uniqueProviders = [
      ...new Set(subscriptions.map((s) => s.plan.provider.userId)),
    ];

    Promise.all(
      uniqueProviders.map((providerId) =>
        fetch(`http://localhost:8080/api/tiffin-menu/${providerId}`)
          .then((res) => res.json())
          .then((data) => ({
            providerId,
            providerName: subscriptions.find(
              (s) => s.plan.provider.userId === providerId
            ).plan.provider.name,
            menu: data,
          }))
          .catch((err) => {
            console.error("Error fetching provider menu:", err);
            return null;
          })
      )
    ).then((results) => {
      setMenus(results.filter((m) => m !== null));
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading menus...</p>;

  if (menus.length === 0) return <p>No menus found.</p>;

  const formatMenu = (menu) => [
    { day: "Monday", items: [menu.mondayLunch, menu.mondayDinner] },
    { day: "Tuesday", items: [menu.tuesdayLunch, menu.tuesdayDinner] },
    { day: "Wednesday", items: [menu.wednesdayLunch, menu.wednesdayDinner] },
    { day: "Thursday", items: [menu.thursdayLunch, menu.thursdayDinner] },
    { day: "Friday", items: [menu.fridayLunch, menu.fridayDinner] },
    { day: "Saturday", items: [menu.saturdayLunch, menu.saturdayDinner] },
    { day: "Sunday", items: [menu.sundayLunch, menu.sundayDinner] },
  ];

  return (
    <div style={{ padding: "20px" }}>
      {menus.map((providerMenu, index) => (
        <div
          key={index}
          style={{
            marginBottom: "40px",
            padding: "20px",
            borderRadius: "12px",
            background: "#f7f9fc",
            boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
          }}
        >
          <h2 style={{ color: "#1e3a5f" }}>
            Provider: {providerMenu.providerName}
          </h2>

          {formatMenu(providerMenu.menu).map((dayMenu, i) => (
            <div
              key={i}
              style={{
                background: "white",
                padding: "15px",
                marginTop: "12px",
                borderRadius: "10px",
                borderLeft: "6px solid #1e3a5f",
              }}
            >
              <h3 style={{ marginBottom: "8px" }}>{dayMenu.day}</h3>
              <p>
                <b>Lunch:</b> {dayMenu.items[0]}
              </p>
              <p>
                <b>Dinner:</b> {dayMenu.items[1]}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
