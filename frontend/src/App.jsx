import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Navbar from './components/Navbar';
import AdminNavbar from './components/AdminNavbar';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import Home from './pages/Home';
import Footer from './components/Footer';
import Doctors from './pages/Doctors';
import About from './pages/About';
import Appointment from './pages/Appointment';
import MyAppointments from './pages/MyAppointments';
import Contact from './pages/Contact';
import AdminDashboard from './pages/Admin/AdminDashboard';
import Verify from './pages/Verify';
import MyProfile from './pages/MyProfile';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorProfile from './pages/Doctor/DoctorProfile';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';



const App = () => {
  return (
    <div className="bg-[#F8F9FD]">
      <ToastContainer /> {/* Toast notifications */}
      
      {/* User Layout */}
      <div className="mx-4 sm:mx-[10%]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:speciality" element={<Doctors />} />
          <Route path="/about" element={<About />} />
          <Route path="/appointment/:docId" element={<Appointment />} />
          <Route path="/my-appointments" element={<MyAppointments />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/verify" element={<Verify />} />
          
        </Routes>
      </div>

      {/* Admin Layout */}
      <div className="w-full">
        <Routes>
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-nav" element={<AdminNavbar />} />
          <Route path="/admin-analytical" element={<AdminDashboard/>} />
          <Route path="/add-doctor" element={<AddDoctor />} />
              <Route path="/doctor-list" element={<DoctorsList />} />
              <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
              <Route path="/doctor-appointments" element={<DoctorAppointments />} />
              <Route path="/doctor-profile" element={<DoctorProfile />} />
              <Route path="/" element={<></>} />
              <Route path="/admin-dashboard" element={<Dashboard />} />
              <Route path="/all-appointments" element={<AllAppointments />} />
        </Routes>
      </div>
      <Footer/>
    </div>
    
  );
};

export default App;
