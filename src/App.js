import './App.css';
import Nav from './components/Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';    
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import RegLogin from './components/RegLogin';
import UserDashboard from './components/UserDashboard';
import ServiceProviderDashboard from './components/ServiceProviderDashboard';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Nav/>
      <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/about' element={<About/>}></Route>
      <Route path='/contact' element={<Contact/>}></Route>
      <Route path='/reglogin' element={<RegLogin/>}></Route>
      <Route path='/user-dashboard' element={<UserDashboard/>}></Route>
      <Route path='/service-provider-dashboard' element={<ServiceProviderDashboard/>}></Route>
      </Routes>


      </BrowserRouter>
    </div>
  );
}

export default App;
