import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Aircrafts from './pages/Aircrafts';
import SrilankanHub from './pages/SrilankanHub';
import CareerGuides from './pages/CareerGuides';
import NewsBlog from './pages/NewsBlog';

import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import SubmitCapture from './pages/SubmitCapture';
import MyProfile from './pages/MyProfile';
import AIChatbot from './components/AIChatbot';
import LiveTracker from './pages/LiveTracker'; // 👑 1. අලුතින් හදපු Live Tracker පේජ් එක මෙතනින් ඉම්පෝට් කළා

export default function App() {
  return (
    <Router>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aircrafts" element={<Aircrafts />} />
        <Route path="/srilankan-hub" element={<SrilankanHub />} />
        <Route path="/careers" element={<CareerGuides />} />
        <Route path="/news" element={<NewsBlog />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-hq" element={<AdminDashboard />} />
        <Route path="/submit-capture" element={<SubmitCapture />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/live-tracker" element={<LiveTracker />} /> {/* 👑 2. සජීවී මැප් එක පේන පාර (Route) එක මෙතනට සෙට් කළා */}
      </Routes>

      <Footer />
      <AIChatbot />
    </Router>
  );
}