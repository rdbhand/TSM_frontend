import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import '../styles/RegLogin.css';

function RegLogin(){
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    address: '',
    password: '',
    phone: ''
  });

  const [formName, setFormName] = useState('register');

  const handleChange = (e) => {
    setFormData({ 
      ...formData,
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8080/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      alert("User Registered Successfully!");
      setFormData({
        name: '',
        email: '',
        role: '',
        address: '',
        password: '',
        phone: ''
      });
    } else {
      alert("Registration Failed!");
    }
  };

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8080/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
        role: formData.role
      })
    });

    if (response.ok) {
      alert("Login Successful!");
      if(formData.role === 'user') {
        navigate('/user-dashboard');
      } else if(formData.role === 'serviceProvider') {
        navigate('/service-provider-dashboard');
      }
      setFormData({
        name: '',
        email: '',
        role: '',
        address: '',
        password: '',
        phone: ''
      });
       
    } else {
      alert("Login Failed!");
    }
  }
  if (formName === 'register') {
  return (
    <form onSubmit={handleSubmit}>
      Name : <input type="text" name="name" value={formData.name} onChange={handleChange}  required /><br />
      Email : <input type="email" name="email" value={formData.email} onChange={handleChange} required /><br />
      Role : &nbsp; &nbsp; &nbsp;<input type="radio" name="role" value="user" onChange={handleChange} /> User
      &nbsp;
      &nbsp;
      <input type="radio" name="role" value="serviceProvider" onChange={handleChange} /> Service Provider<br /> <br/>
      Address : <input type="text" name="address" value={formData.address} onChange={handleChange} /><br />
      Phone : <input type="phone" name="phone" value={formData.phone} onChange={handleChange} /><br />
      Password : <input type="password" name="password" value={formData.password} onChange={handleChange} required /><br />
      <button type="submit">Register</button>
      <button type="button" onClick ={()=>setFormName('login')}>Already have an account? Login</button>
    </form>
  );
}
else{
  return (
    <form onSubmit={handleLogin}>
      Login as : <input type="radio" name="role" value="user" onChange={handleChange} required />User
      &nbsp; &nbsp; &nbsp;<input type="radio" name="role" value="serviceProvider" onChange={handleChange} /> serviceProvider<br/><br/>
      Email : <input type="email" name="email" value={formData.email} onChange={handleChange} required /><br />
      Password : <input type="password" name="password" value={formData.password} onChange={handleChange} required /><br />
      <button type="submit">Login</button>
      <button type="button" onClick ={()=>setFormName('register')}>Not Registered? Register</button>
    </form>
  );
}
}
export default RegLogin;