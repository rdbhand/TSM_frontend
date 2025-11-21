import Nav from "./Nav";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "./UserContext";
import { useContext } from "react";
import "../styles/RegLogin.css";
function RegLogin() {
  const [user, setUser] = useState("user");
  const [reg, setReg] = useState(false);
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    role: user,
  });

  const {setUserData} = useContext(UserContext);

  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();

  const email = formdata.email;
  const password = formdata.password;

  try {
    const res = await fetch("http://localhost:8080/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (res.ok) {
      if (data.password === password) {
        alert("Login successful ✅");

        setUserData(data);
        data.password = ""; // Clear password before storing in sessionStorage
        sessionStorage.setItem("userData", JSON.stringify(data));
        if(user==="user"){
          navigate("/user-dashboard");
        }
        else{
          navigate("/service-provider-dashboard");
        }
        console.log("User details:", data);
      } else {
        alert("Invalid password ❌");
      }
    } else {
      alert(data.message || "Login failed");
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Something went wrong!");
  }
};


  const handleRegister = (event) => {
    // Handling registration logic here
    event.preventDefault();
    // console.log("Registration data:", formdata);
    fetch("http://localhost:8080/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    })
      .then((response) => response.json())
      .then((data) => {
        
        alert("Registration successful:");
        setReg(false);
        
      })
      .catch((error) => {
        console.error("Error during registration:", error);
        
      });
  };

  return (
    <>
      <Nav />
      <div className="role-selection">
        {reg && "Register as : "}
        {!reg && "Login as : "} &nbsp; &nbsp; &nbsp;
        <input
          type="radio"
          name="role"
          value={user}
          checked={user === "user"}
          required
          onChange={() => {
            setUser("user");
            setFormdata({ ...formdata, role: "user" });
          }}
        />{" "}
        User &nbsp;
        <input
          type="radio"
          name="role"
          value={user}
          checked={user === "serviceProvider"}
          required
          onChange={() => {
            setUser("serviceProvider");
            setFormdata({ ...formdata, role: "serviceProvider" });
          }}
        />{" "}
        Service Provider
      </div>
      <form>
        {user === "user" && reg ? (
          <div>
            <h2>User Registration</h2>
            Name:{" "}
            <input
              type="text"
              name="name"
              required
              onChange={(event) => {
                setFormdata({ ...formdata, name: event.target.value });
              }}
            />
            <br />
            Email:{" "}
            <input
              type="email"
              name="email"
              required
              onChange={(event) => {
                setFormdata({ ...formdata, email: event.target.value });
              }}
            />
            <br />
            Address:{" "}
            <input
              type="text"
              name="address"
              required
              onChange={(event) => {
                setFormdata({ ...formdata, address: event.target.value });
              }}
            />
            <br />
            Phone:{" "}
            <input
              type="phone"
              name="phone"
              required
              onChange={(event) => {
                setFormdata({ ...formdata, phone: event.target.value });
              }}
            />
            <br />
            Password:{" "}
            <input
              type="password"
              name="password"
              required
              onChange={(event) => {
                setFormdata({ ...formdata, password: event.target.value });
              }}
            />
            <br />
            <button type="submit" onClick={handleRegister}>
              Register
            </button>
            <button
              type="button"
              onClick={() => {
                setReg(false);
              }}
            >
              Already Registered? Login
            </button>
          </div>
        ) : user === "user" && !reg ? (
          <div>
            <h2>User Login</h2>
            Email:{" "}
            <input
              type="email"
              name="email"
              required
              onChange={(event) => {
                setFormdata({ ...formdata, email: event.target.value });
              }}
            />
            <br />
            Password:{" "}
            <input
              type="password"
              name="password"
              required
              onChange={(event) => {
                setFormdata({ ...formdata, password: event.target.value });
              }}
            />
            <br />
            <button type="submit" onClick={handleLogin}>
              Login
            </button>
            <button
              type="button"
              onClick={() => {
                setReg(true);
              }}
            >
              New User? Register
            </button>
          </div>
        ) : user === "serviceProvider" && reg ? (
          <div>
            <h2>Service Provider Registration</h2>
            Service Provider Name:{" "}
            <input
              type="text"
              name="name"
              required
              onChange={(event) => {
                setFormdata({ ...formdata, name: event.target.value });
              }}
            />
            <br />
            Service Provider Email:{" "}
            <input
              type="email"
              name="email"
              required
              onChange={(event) => {
                setFormdata({ ...formdata, email: event.target.value });
              }}
            />
            <br />
            Service Provider Address:{" "}
            <input
              type="text"
              name="address"
              required
              onChange={(event) => {
                setFormdata({ ...formdata, address: event.target.value });
              }}
            />
            <br />
            Service Provider Phone:{" "}
            <input
              type="phone"
              name="phone"
              required
              onChange={(event) => {
                setFormdata({ ...formdata, phone: event.target.value });
              }}
            />
            <br />
            Password:{" "}
            <input
              type="password"
              name="password"
              required
              onChange={(event) => {
                setFormdata({ ...formdata, password: event.target.value });
              }}
            />
            <br />
            <button type="submit" onClick={handleRegister}>
              Register
            </button>
            <button
              type="button"
              onClick={() => {
                setReg(false);
              }}
            >
              Already Registered? Login
            </button>
          </div>
        ) : (
          <div>
            <h2>Service Provider Login</h2>
            Email:{" "}
            <input
              type="email"
              name="email"
              required
              onChange={(event) => {
                setFormdata({ ...formdata, email: event.target.value });
              }}
            />
            <br />
            Password:{" "}
            <input
              type="password"
              name="password"
              required
              onChange={(event) => {
                setFormdata({ ...formdata, password: event.target.value });
              }}
            />
            <br />
            <button type="submit" onClick={handleLogin}>
              Login
            </button>
            <button
              type="button"
              onClick={() => {
                setReg(true);
              }}
            >
              New Service Provider? Register
            </button>
          </div>
        )}
      </form>
    </>
  );
}
export default RegLogin;
