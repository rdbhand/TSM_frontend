import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';    
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import RegLogin from './components/RegLogin';
import UserDashboard from './components/UserDashboard';
import ServiceProviderDashboard from './components/ServiceProviderDashboard';
import { UserContext } from './components/UserContext';

import { useState } from 'react';
import Testing from './components/Testing';
function App() {

  const [userData, setUserData] = useState({});

  return (
    <div className="App">
      <UserContext.Provider value={{userData, setUserData}}>
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/about' element={<About/>}></Route>
      <Route path='/contact' element={<Contact/>}></Route>
      <Route path='/reglogin' element={<RegLogin/>}></Route>
      <Route path='/user-dashboard' element={<UserDashboard/>}></Route>
      <Route path='/service-provider-dashboard' element={<ServiceProviderDashboard/>}></Route>
      <Route path='/testing' element={<Testing/>}></Route>
      </Routes>


      </BrowserRouter>

      </UserContext.Provider>
    </div>
  );
}

export default App;
